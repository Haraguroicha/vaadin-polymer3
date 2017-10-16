const importStyle = (html:string) => {
    const _html = document.createElement('div');
    _html.setAttribute('style', 'display: none;');
    _html.innerHTML = html;
    document.head.appendChild(_html);
}

export { importStyle };
