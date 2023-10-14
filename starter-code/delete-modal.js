function deleteButton({ id }) {
  createNode(
    {
      tag: 'div',
      classList: ['overlay'],
    },
    main
  );

  const confirmation = createNode(
    { id, tag: 'div', classList: ['confirmation'] },
    main
  );

  createNode(
    {
      tag: 'h2',
      textContent: 'Confirm Deletion',
    },
    confirmation
  );
  createNode(
    {
      tag: 'p',
      textContent: `Are you sure you want to delete invoice ${id}? This action cannot be undone.`,
      classList: ['p'],
    },
    confirmation
  );

  const modalBtns = createNode(
    {
      tag: 'div',
      classList: ['modalBtns'],
    },
    confirmation
  );
  const cancelBtn = createNode(
    {
      tag: 'button',
      classList: ['cancelBtn'],
      textContent: 'Cancel',
    },
    modalBtns
  );

  cancelBtn.addEventListener('click', async function (e) {
    const hash = window.location.hash.replace('#', '');
    if (hash.length) {
      const current = await getInvoice(hash);
      singleCard(current);
    }
  });

  const deleteBtn = createNode(
    {
      tag: 'button',
      classList: ['deleteBtn'],
      textContent: 'Delete',
    },
    modalBtns
  );
  deleteBtn.addEventListener('click', async function (e) {
    await deleteInvoice(id);
    deleteInvoices(id);
    window.location.hash = '';
  });
}
