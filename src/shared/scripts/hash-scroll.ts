import smoothscroll from './smooth-scroll';
import { offsetTop } from './offset';
import { makeArray } from './make-array';

/**
 * hashスクロールを追加
 * @param {string} name クリックイベントを発火させるクラス名
 * @param {number} height 引く高さ
 */

const hashScroll: (name: string, height?: number) => void = (
  name: string,
  height = 0
) => {
  const $$targets = document.querySelectorAll<HTMLElement>(`.${name}`);

  // DOMが一つもない場合何もしない
  if ($$targets.length === 0) return;

  makeArray($$targets).forEach((r: HTMLElement) => {
    r.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const dom = e.currentTarget as HTMLElement;
      const href = dom.getAttribute('href');
      const target = document.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      smoothscroll(offsetTop(target) - height);
    });
  });
};

export default hashScroll;
