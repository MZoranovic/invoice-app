function createNode(
  {
    tag = 'p',
    classList = null,
    id = null,
    textContent = null,
    href = null,
    src = null,
    data = null,
    value = null,
    html = null,
    type = null,
    name = null,
    forInput = null,
    checked = null,
    placeholder = null,
    readonly = null,
    disabled = null,
  },
  parentNode = document.body
) {
  const element = document.createElement(tag);
  if (classList) {
    element.classList.add(...classList);
  }
  if (id) {
    element.id = id;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (href) {
    element.href = href;
  }
  if (src) {
    element.src = src;
  }
  if (data) {
    element.dataset.title = data;
  }
  if (value) {
    element.value = value;
  }

  if (html) {
    element.innerHTML = html;
  }
  if (type) {
    element.type = type;
  }
  if (name) {
    element.name = name;
  }
  if (forInput) {
    element.htmlFor = forInput + '';
  }
  if (checked) {
    element.checked = checked;
  }
  if (placeholder) {
    element.placeholder = placeholder;
  }
  if (readonly) {
    element.readonly = true;
  }
  if (disabled) {
    element.disabled = true;
  }
  parentNode.appendChild(element);
  return element;
}
