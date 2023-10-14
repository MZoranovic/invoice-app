function empty() {
  const emptyPic = createNode(
    {
      tag: 'div',
      classList: ['emptyPic'],
    },
    main
  );
  createNode(
    {
      tag: 'img',
      src: 'assets/illustration-empty.svg',
    },
    emptyPic
  );
  createNode(
    {
      tag: 'h3',
      textContent: 'There is nothing here',
    },
    emptyPic
  );
  createNode(
    {
      tag: 'p',
      textContent:
        'Create an invoice by clicking the New Invoice button and get started',
      classList: ['emptyPicParag'],
    },
    emptyPic
  );
}
