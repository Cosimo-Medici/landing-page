import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdir, copyFile, readdir, readFile, writeFile } from 'node:fs/promises';

// Optional regeneration tool. Normal website builds copy the checked-in bundle.
// Use the app checkout's existing toolchain; install nothing and load no .env.
const here = dirname(fileURLToPath(import.meta.url));
const frontend = resolve(process.argv[2] || join(here, '../../../frontend'));
const requireApp = createRequire(join(frontend, 'package.json'));
const { build } = await import(requireApp.resolve('vite'));
const { default: react } = await import(requireApp.resolve('@vitejs/plugin-react'));
const { default: tailwindcss } = await import(requireApp.resolve('@tailwindcss/vite'));
const outDir = resolve(here, '../src/public/product-demo');
const demoFund = JSON.parse(await readFile(join(here, 'signet-equity.json'), 'utf8'));
await build({
  configFile: false, root: here, base: './', envDir: false, publicDir: false,
  plugins: [{name:'production-style-sources', enforce:'pre', load(id) {
    if(id === join(here,'styles.css')) return '@import "~/app.css";\n@source ' + JSON.stringify(join(frontend,'app')) + ';\n@source ' + JSON.stringify(here) + ';';
  }, transform(code, id) {
    if (id === join(frontend, 'app/components/portfolio/register/CompaniesTable.tsx')) {
      // Keep the real component; populate the two total cells that its generic
      // data contract cannot calculate, and describe non-applicable runway.
      const runway = '<FigRow label="Runway">{typeof c.liquidity?.runwayMonths === "number" ? `${c.liquidity.runwayMonths} mo` : <Dash />}</FigRow>';
      if (!code.includes(runway)) throw new Error('Company runway adapter needs updating');
      code = code.replace(runway, '<FigRow label="Runway">{typeof c.liquidity?.runwayMonths === "number" ? `${c.liquidity.runwayMonths} mo` : c.liquidity?.status || <Dash />}</FigRow>');
      code = code.replace('<FigRow label="Balance">', '<FigRow label="Net debt">');
      code = code.replaceAll('"Vs budget"', '"LTM vs budget"');
      const totalsStart = code.indexOf('<tfoot>');
      if (totalsStart < 0) throw new Error('Company totals adapter needs updating');
      const totals = demoFund.registerTotals;
      const values = [((totals.ltmEbitda / totals.ltmEbitdaBudget - 1) * 100).toFixed(1) + '%', (totals.netDebt / totals.ltmEbitda).toFixed(2) + '×'];
      let footer = code.slice(totalsStart);
      const emptyTotal = '<td className="px-3 py-2 text-right">\n                  <Dash />\n                </td>';
      for (const value of values) {
        if (!footer.includes(emptyTotal)) throw new Error('Company aggregate cells need updating');
        footer = footer.replace(emptyTotal, emptyTotal.replace('<Dash />', '{' + JSON.stringify(value) + '}'));
      }
      return { code: code.slice(0, totalsStart) + footer, map: null };
    }
    if (id !== join(frontend, 'app/routes/application/portfolio-register.tsx')) return;
    // The app route hardcodes the asset-class eyebrow for store-backed data.
    // Bind that identity to this demo's fixture without changing product markup,
    // styling, or the application checkout. Fail if the upstream labels change.
    for (const label of ['Private equity fund', 'Real estate fund']) {
      const original = label + '{mockOrg ? ` · ${mockOrg}` : ""}';
      if (!code.includes(original)) throw new Error('Portfolio demo fund-label adapter needs updating: ' + label);
      code = code.replace(original, '{' + JSON.stringify(demoFund.org) + '}');
    }
    return { code, map: null };
  }}, react(), tailwindcss()],
  resolve: { alias: [
    { find: '~', replacement: join(frontend, 'app') },
    ...['convex/_generated', 'convex/wf3', 'convex/fileConfig', 'convex/lib'].map(find => ({ find, replacement: join(frontend, find) })),
    ...['react', 'react-dom', 'react-router', 'lucide-react'].map(find => ({ find, replacement: join(frontend, 'node_modules', find) })),
  ] },
  build: { outDir, emptyOutDir: true },
});
await mkdir(join(outDir, 'fonts'), { recursive: true });
for(const font of await readdir(join(frontend,'public/fonts'))) await copyFile(join(frontend,'public/fonts',font), join(outDir,'fonts',font));
for (const file of await readdir(join(outDir, 'assets'))) {
  if (!file.endsWith('.css')) continue;
  const target = join(outDir, 'assets', file);
  const css = await readFile(target, 'utf8');
  await writeFile(target, css.replaceAll('/fonts/', '../fonts/'));
}
