
import './style.css';

interface TTipData {
  lession: number;
  title: string;
  mainUrl: string;
}

export default ({title, lession, mainUrl}: TTipData): void => {
  document.title = title;
  window.lession = lession;
  const ele = document.createElement('section');
  ele.className = 'tip-zone';
  ele.innerHTML = `
    <div id="nav-drawer">
      <iframe src="${mainUrl}"></iframe>
      <input id="nav-input" type="checkbox" class="nav-unshown">
      <label id="nav-open" for="nav-input"><span></span></label>
      <label for="nav-input" id="nav-title">点我查看课程${lession}的信息</label>
      <label class="nav-unshown" id="nav-close" for="nav-input"></label>
      <div id="nav-content">
        <ol>
          <li><p>获取教材：<a class="highlight" href="${mainUrl}" target="_blank">本节课教材地址</a></li>
          <li><p>课程学习：打开<span class="highlight">控制台</span>配合教材学习</li>
          <li><p>课后作业：课程学习完打开<span class="highlight">课程_${lession}目录/homework/index.ts</span>完成课后作业</p></li>
          <li>
            <p>同学讨论：扫码关注公众号<span class="highlight">魔术师卡颂</span>，后台回复“53”，我会拉你进<span class="highlight">React53学习群</span></p>
            <div class="qrcode-magician"></div>
          </li>
        </ol>
      </div>
    </div>
  `;
  const target = document.querySelector('#root');
  target?.parentNode?.insertBefore(ele, target);
}