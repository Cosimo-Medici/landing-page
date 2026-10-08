import { useEffect, useState, type MouseEvent, type KeyboardEvent, type FocusEvent, type PointerEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import { TooltipProvider } from '~/components/ui/tooltip';
import { PortfolioPanelProvider, usePortfolioPanel } from '~/lib/vertical/panel-context';
import { VerticalProvider } from '~/lib/vertical/vertical-context';
import { SidePanel } from '~/components/portfolio/SidePanel';
import { QueueStrip } from '~/components/portfolio/Queue';
import PortfolioRegisterRoute from '~/routes/application/portfolio-register';
import type { PeVertical } from '~/lib/vertical/model';
import { chainFromModelChip } from '~/lib/vertical/richChain';
import fixture from './signet-equity.json';
import { WorkflowDemo } from './WorkflowDemo';
import './styles.css';

const vertical = fixture as unknown as PeVertical;

function Example() {
  const panel = usePortfolioPanel();
  const [notice, setNotice] = useState('');
  const [scene, setScene] = useState({ step: 0, phase: 2 });
  useEffect(() => {
    const pause = () => window.parent.postMessage({type:'cosimo-demo-interaction'}, location.origin);
    document.addEventListener('pointerdown', pause, true);
    document.addEventListener('keydown', pause, true);
    window.parent.postMessage({type:'cosimo-demo-ready'}, location.origin);
    return () => {document.removeEventListener('pointerdown',pause,true);document.removeEventListener('keydown',pause,true);};
  }, []);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent) return;
      const command = event.data;
      if (command?.type !== 'cosimo-demo') return;
      if (command.theme === 'light' || command.theme === 'dark') document.documentElement.classList.toggle('dark', command.theme === 'dark');
      if (command.step === 0 || command.step === 1 || command.step === 2) setScene({ step: command.step, phase: [0,1,2].includes(command.phase) ? command.phase : 2 });
      if (typeof command.detail === 'boolean') {
        if (command.detail) {
          const company=vertical.companies[0];
          const chain=company.kpi?.revenue ? chainFromModelChip(company.kpi.revenue, `${company.name} — LTM revenue`) : null;
          if (chain) panel.openChain({kind:'company',id:company.name,label:company.name},chain);
        } else panel.closePanel();
      }
      if (command.action === 'theme') document.documentElement.classList.toggle('dark', command.value === 'dark');
      if (command.action === 'reset') { panel.closePanel(); panel.setQueueOpen(false); for (const key of panel.drawerOpen) panel.toggleDrawer(key); }
      if (command.action === 'queue') panel.setQueueOpen(true);
      if (command.action === 'company') {
        const company = vertical.companies[0];
        panel.openRail({kind:'company',id:company.name,label:company.name});
        const row = document.querySelector('tbody tr');
        if (row instanceof HTMLElement) row.click();
      }
      if (command.action === 'fact') {
        const company = vertical.companies[0];
        if (company.kpi?.revenue) panel.openChain({kind:'company',id:company.name,label:company.name}, chainFromModelChip(company.kpi.revenue, `${company.name} — LTM revenue`)!);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [panel]);

  // Actual app controls stay intact. Network-backed chat and navigation to
  // a real run are deliberately unavailable in this isolated static example.
  const guard = (event: MouseEvent | KeyboardEvent | FocusEvent | PointerEvent) => {
    if (event.type === 'keydown' && 'key' in event && event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target instanceof Element ? event.target.closest('button,a,[role="tab"]') : null;
    if (!target) return;
    if (event.type === 'click' || event.type === 'keydown') window.parent.postMessage({type:'cosimo-demo-interaction'}, location.origin);
    const label = target.textContent?.trim();
    if (label === 'Ask' || label === 'Ask Cosimo' || target.matches('a[href^="/workflows"],a[href^="/chat"]')) {
      event.preventDefault(); event.stopPropagation();
      setNotice('This example uses fictional records. Live conversations and runs are available in your configured workspace.');
    }
  };
  if (scene.step > 0) return <WorkflowDemo phase={scene.step === 2 ? 3 : scene.phase} onOpenReport={() => window.parent.postMessage({type:'cosimo-demo-open-report'}, location.origin)} />;
  return <VerticalProvider vertical={vertical} source="store">
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-background text-foreground" onClickCapture={guard} onMouseDownCapture={guard} onPointerDownCapture={guard} onFocusCapture={guard} onKeyDownCapture={guard}>
      <QueueStrip findings={vertical.findings} isMine={() => false} actOnFinding={() => setNotice('This is a read-only example. No portfolio records have been changed.')} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="min-w-0 flex-1"><PortfolioRegisterRoute /></div>
        <SidePanel fundLabel={fixture.org} fundRead={vertical.fundRead} findings={vertical.findings} />
      </div>
      {notice && <div role="status" className="shrink-0 border-t border-border bg-card px-4 py-2 font-mono text-[11px]">{notice}<button type="button" className="ml-4 underline" onClick={() => setNotice('')}>Dismiss</button></div>}
    </div>
  </VerticalProvider>;
}

createRoot(document.getElementById('root')!).render(<MemoryRouter initialEntries={['/portfolio/companies']}><TooltipProvider><PortfolioPanelProvider><Example /></PortfolioPanelProvider></TooltipProvider></MemoryRouter>);
