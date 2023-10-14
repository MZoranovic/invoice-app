const [getSelect, setSelect] = useSelect();
const [
  getInvoicesData,
  setInvoices,
  updateInvoices,
  deleteInvoices,
  addSingle,
] = useInvoices(invoiceList);

window.addEventListener('DOMContentLoaded', async function () {
  document.querySelector('main').innerHTML = '';
  setSelect('Filter by status');
  const hash = window.location.hash.replace('#', '');
  if (hash.length) {
    const current = await getInvoice(hash);
    if (!current) {
      window.location.hash = '';
      return;
    }
    singleCard(current, updateInvoices, deleteInvoices);
  } else {
    const data = await getInvoices();
    filterSelect(
      { selectValue: getSelect(), num: data.length },
      setSelect,
      setInvoices
    );
    setInvoices(data);
  }

  window.addEventListener('hashchange', async function (e) {
    main.innerHTML = '';
    const value = e.newURL.split('#').at(-1).trim();

    if (value.length) {
      const current = await getInvoice(value);
      if (!current) {
        window.location.hash = '';
        return;
      }
      singleCard(current, updateInvoices, deleteInvoices);
    } else {
      if (getInvoicesData().length === 0) {
        const data = await getInvoices();
        filterSelect(
          { selectValue: getSelect(), num: getInvoicesData().length },
          setSelect,
          setInvoices
        );
        setInvoices(data);
      } else {
        filterSelect(
          { selectValue: getSelect(), num: getInvoicesData().length },
          setSelect,
          setInvoices
        );
        invoiceList(getInvoicesData());
      }
    }
  });
});

function filterSelect(
  { selectValue = 'Filter by status', num = 0 },
  setSelect,
  setFilter
) {
  const invoices = createNode(
    {
      tag: 'div',
      classList: ['invoices'],
    },
    document.querySelector('main')
  );

  const title = createNode(
    {
      tag: 'div',
    },
    invoices
  );

  createNode(
    {
      tag: 'h1',
      classList: ['h1'],
      textContent: 'Invoices',
    },
    title
  );

  createNode(
    {
      tag: 'p',
      classList: ['invNmb'],
      textContent: `There are ${num} total invoices`,
    },
    title
  );

  createNode(
    {
      tag: 'p',
      classList: ['invNmbMob'],
      textContent: '7 invoices',
    },
    title
  );

  const inputs = createNode(
    {
      tag: 'div',
      classList: ['inputs'],
    },
    invoices
  );

  const select = createNode(
    {
      tag: 'select',
    },
    inputs
  );

  const filter = ['Filter by status', 'Draft', 'Pending', 'Paid'];

  select.addEventListener('change', async function (e) {
    main.innerHTML = '';
    const value = e.target.value;
    let data;
    if (value !== 'Filter by status') {
      data = await getInvoices(value);
    } else {
      data = await getInvoices();
    }
    setSelect(value);
    filterSelect(
      { status: value, selectValue: value, num: data.length },
      setSelect,
      setFilter
    );
    setFilter(data);
  });

  filter.forEach((value) => {
    createNode({ tag: 'option', textContent: value, value }, select);
  });

  select.value = selectValue;

  const newInvoiceBtn = createNode(
    {
      tag: 'button',
      classList: ['newInvoiceBtn'],
    },
    inputs
  );
  newInvoiceBtn.addEventListener('click', function (e) {
    document.querySelector('[data-bs-toggle="offcanvas"]').click();
    generateInvoice(
      (vals = {
        ...formTemplate,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
      }),
      createInvoice
    );
  });

  const btnCover = createNode(
    {
      tag: 'div',
      classList: ['btnCover'],
    },
    newInvoiceBtn
  );

  createNode(
    {
      tag: 'img',
      src: 'assets/icon-plus.svg',
      classList: ['plusIcon'],
    },
    btnCover
  );

  createNode(
    {
      tag: 'p',
      textContent: 'New Invoice',
      classList: ['newInvoice'],
    },
    newInvoiceBtn
  );

  createNode(
    {
      tag: 'p',
      textContent: 'New',
      classList: ['newInvoiceMob'],
    },
    newInvoiceBtn
  );
}

function invoicess({ id, paymentDue, clientName, total, status }) {
  const invoice = createNode(
    { id, tag: 'a', href: '#' + id, classList: ['invoice'] },
    document.querySelector('main')
  );

  createNode(
    {
      tag: 'div',
      classList: ['invoiceNumber'],
      textContent: id,
    },
    invoice
  );

  const invoiceMobile = createNode(
    {
      id,
      tag: 'a',
      href: '#' + id,
      classList: ['invoiceMobile'],
    },
    main
  );

  const invDataFirstBlock = createNode(
    {
      tag: 'div',
      classList: ['invDataFirstBlock'],
    },
    invoiceMobile
  );

  createNode(
    {
      tag: 'div',
      classList: ['invoiceNumber'],
      textContent: id,
    },
    invDataFirstBlock
  );

  createNode(
    {
      tag: 'div',
      classList: ['clientName'],
      textContent: clientName,
    },
    invDataFirstBlock
  );

  const invDataSecondBlock = createNode(
    {
      tag: 'div',
      classList: ['invDataSecondBlock'],
    },
    invoiceMobile
  );

  const due = createNode(
    {
      tag: 'div',
      classList: ['due'],
    },
    invoice
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Due',
    },
    due
  );

  const leftSideMob = createNode(
    {
      tag: 'div',
      classList: ['leftSideMob'],
    },
    invDataSecondBlock
  );

  const dueMob = createNode(
    {
      tag: 'div',
      classList: ['dueMob'],
    },
    leftSideMob
  );

  createNode(
    {
      tag: 'p',
      textContent: 'Due',
    },
    dueMob
  );

  createNode(
    {
      tag: 'div',
      classList: ['paymentDue'],
      textContent: new Date(paymentDue).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
    due
  );

  createNode(
    {
      tag: 'div',
      classList: ['paymentDue'],
      textContent: new Date(paymentDue).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
    dueMob
  );

  createNode(
    {
      tag: 'div',
      classList: ['clientName'],
      textContent: clientName,
    },
    invoice
  );

  createNode(
    {
      tag: 'div',
      classList: ['total'],
      textContent: total.toFixed(2),
    },
    invoice
  );

  createNode(
    {
      tag: 'div',
      classList: ['total'],
      textContent: total.toFixed(2),
    },
    leftSideMob
  );

  createNode(
    {
      tag: 'div',
      classList: [status],
      textContent: status,
    },
    invoice
  );

  const rightSideMob = createNode(
    {
      tag: 'div',
      classList: ['rightSideMob'],
    },
    invDataSecondBlock
  );

  createNode(
    {
      tag: 'div',
      classList: [status],
      textContent: status,
    },
    rightSideMob
  );

  createNode(
    {
      tag: 'img',
      src: 'assets/icon-arrow-right.svg',
      classList: ['arrow'],
    },
    invoice
  );
}

Array.prototype.invoicesPage = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
};

function invoiceList(data) {
  if (!data.length) {
    return empty();
  }
  data.invoicesPage(invoicess);
}
