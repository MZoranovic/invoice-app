const offcanvas = document.querySelector('.offcanvas-body');
const formTemplate = {
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 0,
  clientName: '',
  clientEmail: '',
  status: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
};

function generateInvoice(vals = formTemplate) {
  offcanvas.innerHTML = '';
  for (const key in invoiceMap) {
    const parent = createNode(
      {
        tag: 'div',
        classList: [key],
      },
      offcanvas
    );
    if (invoiceMap[key].label) {
      createNode(
        {
          tag: 'span',
          classList: invoiceMap[key].className
            ? [invoiceMap[key].className]
            : undefined,
          textContent: invoiceMap[key].label,
        },
        parent
      );
    }
    if (invoiceMap[key].inputs) {
      for (const input of invoiceMap[key].inputs) {
        generateInputs(input, parent, vals);
      }
    }
    if (invoiceMap[key].header) {
      for (const input of invoiceMap[key].header) {
        generateHeader(input, parent);
      }
    }
    if (invoiceMap[key].itemListTemplate) {
      generateItemList(
        invoiceMap[key].itemListTemplate,
        parent,
        vals.items,
        vals
      );
    }
    if (invoiceMap[key].footer) {
      const isDisabled = vals?.items?.some(
        ({ name, quantity, price }) => !name || !quantity || !price
      );
      for (const input of invoiceMap[key].footer) {
        generateFooter(input, parent, vals, isDisabled);
      }
    }
  }
}

function generateInputs(input, parent, vals) {
  const keys = input.name.split('.');
  const inputParent = createNode(
    {
      tag: 'div',
      classList: input.className ? [input.className] : undefined,
    },
    parent
  );
  createNode(
    {
      tag: 'p',
      textContent: input.label,
      classList: ['text'],
    },
    inputParent
  );

  if (input.type === 'select') {
    const select = createNode(
      {
        tag: 'select',
        name: input.name,
      },
      inputParent
    );
    select.addEventListener('change', (e) => {
      if (keys.length === 1) vals[keys[0]] = +e.target.value;
      generateInvoice(vals);
    });
    for (const option of input.options) {
      createNode(
        {
          tag: 'option',
          textContent: option.label,
          value: option.value,
        },
        select
      );
    }
    select.value = vals[keys[0]];
  } else {
    let val = undefined;
    if (keys.length === 1) val = vals[keys[0]];
    if (keys.length === 2) val = vals?.[keys[0]]?.[keys[1]];
    createNode(
      {
        tag: 'input',
        type: input.type,
        name: input.name,
        value: val,
      },
      inputParent
    ).addEventListener('change', (e) => {
      if (keys.length === 1) vals[keys[0]] = e.target.value;
      if (keys.length === 2) {
        vals[keys[0]][keys[1]] = e.target.value;
      }
      generateInvoice(vals);
    });
  }
}
function generateHeader(input, parent) {
  createNode(
    {
      tag: 'p',
      classList: input.className ? [input.className] : undefined,
      textContent: input.label,
    },
    parent
  );
}

function generateItemList(input, parent, vals = [{}], data) {
  for (const i in vals) {
    const item = createNode(
      {
        tag: 'div',
        classList: ['item'],
      },
      parent
    );
    for (const m of input) {
      let value = undefined;
      if (m.name) {
        const key = m.name.split('.').at(-1);

        value = vals[i][key];
      }
      if (m.tag === 'input') {
        createNode(
          {
            tag: m.tag,
            name: m.name + '.' + i,
            value,
            src: m.src,
            readonly: m.readonly,
            disabled: m.disabled,
          },
          item
        ).addEventListener('change', (e) => {
          const key = e.target.name.split('.').at(1);
          if (key === 'name') {
            vals[i] = { ...vals[i], [key]: e.target.value };
          } else {
            vals[i] = { ...vals[i], [key]: +e.target.value };
            if (
              vals[i]['quantity'] !== undefined &&
              vals[i]['price'] !== undefined
            ) {
              vals[i] = {
                ...vals[i],
                total: vals[i]['quantity'] * vals[i]['price'],
              };
            }
          }
          generateInvoice(data);
        });
      } else {
        createNode({ tag: m.tag, id: i, src: m.src }, item).addEventListener(
          'click',
          function () {
            const id = +this.id;
            const dataCopy = { ...data };
            dataCopy.items = dataCopy.items.filter((_, i) => i !== id);
            generateInvoice(dataCopy);
          }
        );
      }
    }
  }
}

function generateFooter(input, parent, vals, disableButton = false) {
  if (input.name === 'cancel') {
    return createNode(
      {
        tag: 'button',
        classList: input.className ? [input.className] : undefined,
        textContent: vals.id ? input.label : input.newLabel,
      },
      parent
    ).addEventListener('click', function () {
      document.querySelector('[data-bs-toggle="offcanvas"]').click();
      if (vals.id) {
        singleCard();
      } else {
        window.location.hash = '';
      }
    });
  }

  if (!vals.id && input.name === 'draft') {
    createNode(
      {
        tag: 'button',
        classList: input.className ? [input.className] : undefined,
        textContent: input.label,
        disabled: !isFormValidDraft(vals),
      },
      parent
    ).addEventListener('click', async function () {
      const total = vals.items.reduce((acc, item) => item.total + acc, 0);

      const updateForm = await createInvoice({
        ...vals,
        total,
        status: 'draft',
      });
      console.log(update);
      document.querySelector('[data-bs-toggle="offcanvas"]').click();
      update(updateForm);
    });
  }

  if (input.name === 'save') {
    return createNode(
      {
        tag: 'button',
        classList: input.className ? [input.className] : undefined,
        textContent: vals.id ? input.label : input.newLabel,
        disabled: !isFormValid(vals),
      },
      parent
    ).addEventListener('click', async function () {
      const total = vals.items.reduce((acc, item) => item.total + acc, 0);
      let updateForm;
      if (vals.id) {
        updateForm = await updateInvoice(vals.id, {
          ...vals,
          total,
          status: 'pending',
        });
      } else {
        updateForm = await createInvoice({ ...vals, total, status: 'pending' });
        addSingle(updateForm);
      }

      document.querySelector('[data-bs-toggle="offcanvas"]').click();
      singleCard(updateForm);
      window.location.hash = updateForm.id;
    });
  }

  if (input.name === 'newItem')
    createNode(
      {
        tag: 'button',
        classList: input.className ? [input.className] : undefined,
        textContent: input.label,
        disabled: disableButton,
      },
      parent
    ).addEventListener('click', () => {
      vals.items.push({});
      generateInvoice();
    });
}

function isFormValid(form) {
  for (const key in form) {
    if (typeof form[key] === 'object') {
      if (Array.isArray(form[key])) {
        const disabled = form[key].some(
          ({ name, quantity, price, total }) =>
            !name || !quantity || !price || !total
        );
        if (disabled) return false;
      } else {
        const currentObject = form[key];
        for (const key in currentObject) {
          if (!currentObject[key]) return false;
        }
      }
    }
    if (!form[key] && key !== 'total') {
      return false;
    }
  }
  return true;
}

function isFormValidDraft(form) {
  const disabled = form.items.some(
    ({ name, quantity, price, total }) => !name || !quantity || !price || !total
  );
  if (disabled) return false;
  return form['paymentTerms'] && form['paymentDue'] && form['clientName'];
}
