/** A story's controls: a small strip at the bottom left of the canvas, foldable so it never hides what it shows. */
export class Panel {
  readonly el = document.createElement('div');

  constructor(title = 'Acciones') {
    this.el.className = 'kit-panel';
    const head = document.createElement('div');
    head.className = 'kit-head';
    head.innerHTML = `<span>${title}</span>`;
    const fold = document.createElement('button');
    fold.type = 'button';
    fold.textContent = '▾';
    fold.setAttribute('aria-label', 'Plegar');
    fold.addEventListener('click', () => {
      const folded = this.el.classList.toggle('kit-folded');
      fold.textContent = folded ? '▴' : '▾';
    });
    head.append(fold);
    this.el.append(head);
    // On a phone-sized canvas the strip starts folded, so the story is seen whole first.
    if (innerWidth < 520) {
      this.el.classList.add('kit-folded');
      fold.textContent = '▴';
    }
    for (const type of ['pointerdown', 'pointerup', 'pointermove', 'click']) this.el.addEventListener(type, (e) => e.stopPropagation());
    document.body.append(this.el);
  }

  row(label?: string) {
    const row = document.createElement('div');
    row.className = 'kit-row';
    if (label) row.innerHTML = `<span>${label}</span>`;
    this.el.append(row);
    return row;
  }

  button(label: string, act: () => void, row = this.row()) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'kit-btn';
    b.textContent = label;
    b.addEventListener('click', act);
    row.append(b);
    return b;
  }

  /** One of several buttons pressed at a time. */
  choice<T extends string>(label: string, options: Array<[T, string]>, initial: T, act: (value: T) => void) {
    const row = this.row(label);
    const buttons = options.map(([value, text]) =>
      this.button(text, () => {
        for (const b of buttons) b.setAttribute('aria-pressed', String(b === btn(value)));
        act(value);
      }, row),
    );
    const btn = (value: T) => buttons[options.findIndex(([v]) => v === value)];
    for (const b of buttons) b.setAttribute('aria-pressed', String(b === btn(initial)));
    return row;
  }

  toggle(label: string, initial: boolean, act: (on: boolean) => void) {
    let on = initial;
    const b = this.button(label, () => {
      on = !on;
      b.setAttribute('aria-pressed', String(on));
      act(on);
    });
    b.setAttribute('aria-pressed', String(on));
    return b;
  }

  select(label: string, options: Array<[string, string]>, initial: string, act: (value: string) => void) {
    const row = this.row(label);
    const s = document.createElement('select');
    s.innerHTML = options.map(([v, text]) => `<option value="${v}">${text}</option>`).join('');
    s.value = initial;
    s.addEventListener('change', () => act(s.value));
    row.append(s);
    return s;
  }

  stats() {
    const pre = document.createElement('div');
    pre.className = 'kit-stats';
    this.el.append(pre);
    return pre;
  }
}
