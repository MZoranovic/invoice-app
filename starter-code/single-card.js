const main = document.querySelector('main');
function singleCard(
  {
    id,
    status,
    description,
    senderAddress,
    clientAddress,
    total,
    createdAt,
    clientName,
    paymentDue,
    clientEmail,
    items,
    paymentTerms,
  },
  update,
  deleteFilter
) {
  document.querySelector('main').innerHTML = '';

  const backButton = createNode(
    {
      tag: 'a',
      classList: ['backButton'],
      href: '#',
    },
    document.querySelector('main')
  );

  createNode(
    {
      tag: 'img',
      src: 'assets/icon-arrow-left.svg',
      classList: ['leftArrow'],
    },
    backButton
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Go back',
      classList: ['goBack'],
    },
    backButton
  );

  const statusPage = createNode(
    {
      id,
      tag: 'div',
    },
    document.querySelector('main')
  );

  const topField = createNode(
    {
      tag: 'div',
      classList: ['topField'],
    },
    statusPage
  );

  const statusFirst = createNode(
    {
      tag: 'div',
      classList: ['statusFirst'],
    },
    topField
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Status',
    },
    statusFirst
  );

  const statusBox = createNode(
    {
      tag: 'div',
      classList: ['statusBox'],
    },
    statusFirst
  );

  createNode(
    {
      tag: 'div',
      classList: [status],
      textContent: status,
    },
    statusBox
  );

  const buttons = createNode(
    {
      tag: 'div',
      classList: ['buttons'],
    },
    topField
  );

  const editBtn = createNode(
    {
      tag: 'button',
      textContent: 'Edit',
      classList: ['edit'],
    },
    buttons
  );

  editBtn.addEventListener('click', function (e) {
    document.querySelector('[data-bs-toggle="offcanvas"]').click();
    generateInvoice({
      id,
      status,
      description,
      senderAddress,
      clientAddress,
      total,
      createdAt,
      clientName,
      paymentDue,
      clientEmail,
      paymentTerms,
      items,
    });
  });

  const deleteBtn = createNode(
    {
      tag: 'button',
      textContent: 'Delete',
      classList: ['delete'],
    },
    buttons
  );

  deleteBtn.addEventListener('click', function (e) {
    deleteButton({ id });
  });

  if (status === 'pending') {
    createNode(
      {
        tag: 'button',
        textContent: 'Mark as Paid',
        classList: ['paidBtn'],
      },
      buttons
    ).addEventListener('click', async function (e) {
      const result = await changeStatus(id);
      singleCard(result, update, deleteFilter);
      update(result);
    });
  }

  const container = createNode(
    {
      tag: 'div',
      classList: ['container'],
    },
    statusPage
  );

  const information = createNode(
    {
      tag: 'div',
    },
    container
  );

  createNode(
    {
      tag: 'h5',
      textContent: id,
    },
    information
  );

  createNode(
    {
      tag: 'p',
      textContent: description,
    },
    information
  );

  const adress = createNode(
    {
      tag: 'div',
      classList: ['adress'],
    },
    container
  );

  createNode(
    {
      tag: 'p',
      textContent: senderAddress.street,
    },
    adress
  );

  createNode(
    {
      tag: 'p',
      textContent: senderAddress.city,
    },
    adress
  );

  createNode(
    {
      tag: 'p',
      textContent: senderAddress.postCode,
    },
    adress
  );

  createNode(
    {
      tag: 'p',
      textContent: senderAddress.country,
    },
    adress
  );

  const info = createNode(
    {
      tag: 'div',
      classList: ['info'],
    },
    container
  );

  const first = createNode(
    {
      tag: 'div',
    },
    info
  );

  const date = createNode(
    {
      tag: 'div',
    },
    first
  );

  createNode(
    {
      tag: 'div',
    },
    date
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Invoice date',
      classList: ['p'],
    },
    date
  );

  createNode(
    {
      tag: 'div',
      classList: ['textCont'],
      textContent: new Date(createdAt).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
    date
  );

  const payment = createNode(
    {
      tag: 'div',
      classList: ['payment'],
    },
    first
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Payment Due',
      classList: ['p'],
    },
    payment
  );

  createNode(
    {
      tag: 'div',
      classList: ['textCont'],
      textContent: new Date(paymentDue).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
    payment
  );

  const second = createNode(
    {
      tag: 'div',
    },
    info
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Bill to',
    },
    second
  );

  createNode(
    {
      tag: 'div',
      classList: ['textCont'],
      textContent: clientName,
    },
    second
  );

  createNode(
    {
      tag: 'p',
      textContent: clientAddress.street,
    },
    second
  );

  createNode(
    {
      tag: 'p',
      textContent: clientAddress.city,
    },
    second
  );

  createNode(
    {
      tag: 'p',
      textContent: clientAddress.postCode,
    },
    second
  );

  createNode(
    {
      tag: 'p',
      textContent: clientAddress.country,
    },
    second
  );

  const third = createNode(
    {
      tag: 'div',
    },
    info
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Sent to',
    },
    third
  );

  createNode(
    {
      tag: 'div',
      classList: ['textCont'],
      textContent: clientEmail,
    },
    third
  );

  const amount = createNode(
    {
      tag: 'div',
      classList: ['amount'],
    },
    statusPage
  );

  const amountDue = createNode(
    {
      tag: 'div',
      classList: ['amountCover'],
    },
    amount
  );

  const left = createNode(
    {
      tag: 'div',
      classList: ['left'],
    },
    amountDue
  );
  createNode(
    {
      tag: 'p',
      textContent: 'Item Name',
    },
    left
  );

  const right = createNode(
    {
      tag: 'div',
      classList: ['right'],
    },
    amountDue
  );

  const itemData = createNode(
    {
      tag: 'div',
      classList: ['itemData'],
    },
    right
  );

  createNode(
    {
      tag: 'p',
      textContent: 'QTY.',
    },
    itemData
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Price',
    },
    itemData
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Total',
    },
    itemData
  );

  const service = createNode(
    {
      tag: 'div',
    },
    left
  );

  createNode(
    {
      tag: 'div',
      textContent: Object.values(items || {})[0]?.name,
      classList: ['textCont'],
    },
    service
  );

  const itemsData = createNode(
    {
      tag: 'div',
      classList: ['itemData'],
    },
    right
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[0]?.quantity,
      classList: ['itemsQty'],
    },
    itemsData
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[0]?.price.toFixed(2),
      classList: ['price'],
    },
    itemsData
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[0]?.total.toFixed(2),
      classList: ['amntTotal'],
    },
    itemsData
  );

  const serviceTwo = createNode(
    {
      tag: 'div',
    },
    left
  );
  createNode(
    {
      tag: 'div',
      classList: ['textCont'],
      textContent: Object.values(items || {})[1]?.name,
    },
    serviceTwo
  );

  const itemsDataTwo = createNode(
    {
      tag: 'div',
      classList: ['itemData'],
    },
    right
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[1]?.quantity,
      classList: ['itemsQty'],
    },
    itemsDataTwo
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[1]?.price.toFixed(2),
      classList: ['price'],
    },
    itemsDataTwo
  );

  createNode(
    {
      tag: 'p',
      textContent: Object.values(items || {})[1]?.total.toFixed(2),
      classList: ['amntTotal'],
    },
    itemsDataTwo
  );

  const footer = createNode(
    {
      tag: 'div',
      classList: ['footer'],
    },
    amount
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Amount Due',
      classList: ['amntDue'],
    },
    footer
  );

  createNode(
    {
      tag: 'p',
      textContent: total.toFixed(2),
      classList: ['footerTotal'],
    },
    footer
  );
}
