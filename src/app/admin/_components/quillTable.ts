// Table support for the Quill editors (Selected Work + Blog).
// Quill's built-in `table` module registers TableCell/TableRow/TableBody/
// TableContainer blots as soon as `quill` is imported, so pasted <table>
// markup already parses correctly — this just wires up the toolbar so
// editors can also insert/grow/shrink tables by hand.

const insertRowIcon = `<svg viewbox="0 0 18 18"><g class="ql-fill ql-stroke ql-thin ql-transparent"><rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5"></rect><rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5"></rect></g><rect class="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5"></rect><polygon class="ql-fill ql-stroke ql-thin" points="4.5 11 2.5 9 4.5 7 4.5 11"></polygon><line class="ql-stroke" x1="6" x2="4" y1="9" y2="9"></line></svg>`;

const insertColumnIcon = `<svg viewbox="0 0 18 18"><g class="ql-fill ql-transparent"><rect height="10" rx="1" ry="1" width="4" x="12" y="2"></rect><rect height="10" rx="1" ry="1" width="4" x="2" y="2"></rect></g><path class="ql-fill" d="M11.354,4.146l-2-2a0.5,0.5,0,0,0-.707,0l-2,2A0.5,0.5,0,0,0,7,5H8V6a1,1,0,0,0,2,0V5h1A0.5,0.5,0,0,0,11.354,4.146Z"></path><rect class="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="8"></rect></svg>`;

const deleteRowIcon = `<svg viewbox="0 0 18 18"><g class="ql-fill ql-stroke ql-thin ql-transparent"><rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5"></rect><rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5"></rect></g><rect class="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5"></rect><line class="ql-stroke ql-thin" x1="6.5" x2="3.5" y1="7.5" y2="10.5"></line><line class="ql-stroke ql-thin" x1="3.5" x2="6.5" y1="7.5" y2="10.5"></line></svg>`;

const deleteColumnIcon = `<svg viewbox="0 0 18 18"><g class="ql-fill ql-transparent"><rect height="10" rx="1" ry="1" width="4" x="2" y="6"></rect><rect height="10" rx="1" ry="1" width="4" x="12" y="6"></rect></g><rect class="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="2"></rect><path class="ql-fill" d="M9.707,13l1.146-1.146a0.5,0.5,0,0,0-.707-0.707L9,12.293,7.854,11.146a0.5,0.5,0,0,0-.707.707L8.293,13,7.146,14.146a0.5,0.5,0,1,0,.707.707L9,13.707l1.146,1.146a0.5,0.5,0,0,0,.707-0.707Z"></path></svg>`;

export const TABLE_TOOLBAR_GROUP = [
  "table",
  "table-insert-row",
  "table-insert-column",
  "table-delete-row",
  "table-delete-column",
];

const TABLE_BUTTON_TITLES: Record<string, string> = {
  table: "Insert table",
  "table-insert-row": "Insert row below",
  "table-insert-column": "Insert column right",
  "table-delete-row": "Delete row",
  "table-delete-column": "Delete column",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerTableIcons(Quill: any) {
  const icons = Quill.import("ui/icons");
  icons["table-insert-row"] = insertRowIcon;
  icons["table-insert-column"] = insertColumnIcon;
  icons["table-delete-row"] = deleteRowIcon;
  icons["table-delete-column"] = deleteColumnIcon;
}

function promptTableSize(): [number, number] | null {
  const input = window.prompt("Table size (rows x columns)", "3x3");
  if (!input) return null;
  const match = input.match(/^\s*(\d+)\s*[xX]\s*(\d+)\s*$/);
  const rows = match ? Math.max(1, Math.min(20, parseInt(match[1], 10))) : 3;
  const cols = match ? Math.max(1, Math.min(10, parseInt(match[2], 10))) : 3;
  return [rows, cols];
}

// Quill's toolbar only wires up a button's click listener at construction
// time if a handler for its format is already registered (or the format is
// a real Parchment blot) — so these must go in `modules.toolbar.handlers`,
// not added via `toolbar.addHandler()` after the editor is created.
// Handlers run with `this` bound to the toolbar module, which exposes the
// live editor as `this.quill`.
export const tableToolbarHandlers: Record<string, () => void> = {
  table() {
    const size = promptTableSize();
    if (!size) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).quill.getModule("table").insertTable(size[0], size[1]);
  },
  "table-insert-row"() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).quill.getModule("table").insertRowBelow();
  },
  "table-insert-column"() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).quill.getModule("table").insertColumnRight();
  },
  "table-delete-row"() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).quill.getModule("table").deleteRow();
  },
  "table-delete-column"() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).quill.getModule("table").deleteColumn();
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function titleTableButtons(quill: any) {
  const toolbar = quill.getModule("toolbar");
  const container: HTMLElement | undefined = toolbar.container;
  Object.entries(TABLE_BUTTON_TITLES).forEach(([name, title]) => {
    container?.querySelector(`.ql-${name}`)?.setAttribute("title", title);
  });
}
