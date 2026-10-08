import { useMemo, useRef } from 'react';
import fixture from './signet-equity.json';
import { Wf3TranscriptView } from '~/components/wf3/transcript/TranscriptView';
import { Wf3Rail } from '~/components/wf3/Rail';
import { Wf3Crumbs } from '~/components/wf3/text';
import { Wf3Chip } from '~/components/wf3/chips';
import { ConfirmProvider } from '~/lib/confirm';
import type { Wf3Def, Wf3RunStep } from '~/lib/wf3/types';
import type { Wf3TranscriptPart } from '~/lib/wf3/transcript';

// These are authored presentation inputs, not a mocked backend. Every visible
// card, step, file, and type treatment is rendered by production components.
const definition = {
  version: 1,
  name: 'Quarterly portfolio update',
  trigger: { kind: 'manual' },
  steps: [
    { id: 'records', kind: 'task', name: 'Read the records', prompt: 'Read the Q3 management accounts, company updates, and prior report.', lessons: [] },
    { id: 'figures', kind: 'task', name: 'Check the figures', prompt: 'Compare reported revenue with management commentary. Keep differences visible.', lessons: [] },
    { id: 'report', kind: 'task', name: 'Prepare the draft', prompt: 'Prepare the portfolio update. Include outstanding questions for the team.', lessons: [] },
  ],
} as Wf3Def;

const records: Wf3TranscriptPart[] = [
  { type: 'user', key: 'request', author_name: 'You', body: 'Prepare our Q3 investor update using the management accounts, company updates, and last quarter’s format.' },
  { type: 'tools', key: 'sources', step_index: 0, items: ['Read Q3 management accounts', 'Read company commentary', 'Read Q2 report outline'] },
  { type: 'report', key: 'records-done', step_index: 0, name: 'Read the records', summary: 'Read the six company submissions, Q3 budgets, management commentary, and Q2 report outline. Reporting period: July 1–September 30, 2026; currency: USD.' },
];
const figures: Wf3TranscriptPart[] = [
  { type: 'text', key: 'calculation', step_index: 1, body: fixture.companies.map(c => `**${c.name}**: Q3 revenue **$${c.quarterly.revenue.toFixed(1)}m**; EBITDA **$${c.quarterly.ebitda.toFixed(1)}m**.`).join('\n\n') + '\n\nCombined revenue: **$70.0m** vs **$72.0m** budget (−$2.0m; −2.8%). EBITDA: **$9.6m** vs **$10.4m** budget (−$0.8m; −7.7%).' },
  { type: 'report', key: 'figures-done', step_index: 1, name: 'Check the figures', summary: 'All six revenue and EBITDA lines reconcile to the portfolio totals. An earlier Fiesole update reports $9.4m revenue, versus $9.0m in the accounts. The $0.4m difference remains open. The draft uses the accounts provisionally; Arno’s shipping schedule, Fiesole’s production plan and Porta’s variance explanation also need follow-up.' },
];
const output: Wf3TranscriptPart = {
  type: 'report', key: 'draft', step_index: 2, name: 'Prepare the draft',
  summary: 'Prepared a three-page investor update with revenue and EBITDA tables for all six companies. Fiesole’s $0.4m revenue difference and three company follow-ups remain in the internal review notes. The draft is not approved for distribution.',
  outputs: [{ name: 'Signet Equity — Q3 portfolio update.pdf', file_type: 'application/pdf', file_size: 32768, output_path_id: 'illustrative-report', status: 'ready' }],
};

export function WorkflowDemo({ phase, onOpenReport }: { phase: number; onOpenReport: () => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const completed = phase === 3;
  const parts = useMemo(() => phase === 0 ? records.slice(0, 1) : phase === 1 ? records : [...records, ...figures, ...(completed ? [output] : [{ type: 'text', key: 'draft-work', step_index: 2, body: 'Preparing the investor draft with the unresolved revenue question beside the figures.' } as Wf3TranscriptPart])], [phase, completed]);
  const runSteps = definition.steps.map((step, index) => ({ step_id: step.id, status: completed || index < (phase === 0 ? 0 : phase === 1 ? 1 : 2) ? 'done' : index === (phase === 0 ? 0 : phase === 1 ? 1 : 2) ? 'running' : 'pending' })) as Wf3RunStep[];
  return <ConfirmProvider>
    <div className="flex h-screen min-h-0 flex-1 flex-col overflow-hidden bg-background text-foreground">
      {/* Same header layout and components as RunView. The authenticated action
          menu and composer are outside this cropped demonstration. */}
      <div className="flex min-h-[40px] shrink-0 flex-wrap items-center gap-3 border-b border-border bg-card px-6 py-2">
        <Wf3Crumbs segments={[{ label: 'Workflows' }, { label: 'Quarterly portfolio update', truncate: true }]} leaf="Signet Equity · Q3 2026" leafAs="h2" />
        {!completed && <Wf3Chip tone="accent" pulse>running</Wf3Chip>}
      </div>
      <div className="flex min-h-0 flex-1">
        <div ref={scroller} className="min-h-0 min-w-0 flex-1 overflow-y-auto [overflow-anchor:none] [scrollbar-gutter:stable] px-6 pb-6">
          <Wf3TranscriptView parts={parts} stepStatusAt={i => runSteps[i]?.status} runStatus={completed ? 'done' : 'running'} onOpenFile={onOpenReport} scrollerRef={scroller} historyReady />
        </div>
        <aside className="w-[300px] shrink-0 overflow-y-auto border-l border-border bg-card p-4" aria-label="Workflow run progress">
          <Wf3Rail def={definition} mode="run" runSteps={runSteps} runStatus={completed ? 'done' : 'running'} />
        </aside>
      </div>
    </div>
  </ConfirmProvider>;
}
