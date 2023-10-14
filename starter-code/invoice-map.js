const invoiceMap = {
  title: {
    label: 'New Invoice',
    className: 'title',
  },
  sender: {
    label: 'Bill From',
    inputs: [
      {
        label: 'Street Address',
        type: 'text',
        name: 'senderAddress.street',
        className: 'w-100',
      },
      {
        label: 'City',
        type: 'text',
        name: 'senderAddress.city',
      },
      {
        label: 'Post Code',
        type: 'text',
        name: 'senderAddress.postCode',
      },
      {
        label: 'Country',
        type: 'text',
        name: 'senderAddress.country',
      },
    ],
  },
  client: {
    label: 'Bill To',
    inputs: [
      {
        label: 'Client`s Name',
        type: 'text',
        name: 'clientName',
        className: 'w-100',
      },
      {
        label: 'Client`s Email',
        type: 'email',
        name: 'clientEmail',
        className: 'w-100',
      },
      {
        label: 'Street Address',
        type: 'text',
        name: 'clientAddress.street',
        className: 'w-100',
      },
      {
        label: 'City',
        type: 'text',
        name: 'clientAddress.city',
      },
      {
        label: 'Post Code',
        type: 'text',
        name: 'clientAddress.postCode',
      },
      {
        label: 'Country',
        type: 'text',
        name: 'clientAddress.country',
      },
    ],
  },
  projectData: {
    inputs: [
      {
        label: 'Invoice Date',
        type: 'date',
        name: 'paymentDue',
        className: 'w-45',
      },
      {
        label: 'Payment Terms',
        type: 'select',
        name: 'paymentTerms',
        className: 'w-45',
        options: [
          {
            label: 'Net 1 day',
            value: 1,
          },
          {
            label: 'Net 7 days',
            value: 7,
          },
          {
            label: 'Net 14 days',
            value: 14,
          },
          {
            label: 'Net 30 days',
            value: 30,
          },
        ],
      },
      {
        label: 'Project Description',
        type: 'text',
        name: 'description',
        className: 'w-100',
      },
    ],
  },
  itemsList: {
    label: 'Item List',
    className: 'h3',
    header: [
      {
        label: 'Item Name',
      },
      {
        label: 'Qty.',
      },
      {
        label: 'Price',
      },
      {
        label: 'Total',
      },
    ],
    itemListTemplate: [
      {
        tag: 'input',
        type: 'text',
        name: 'items.name',
      },
      {
        tag: 'input',
        type: 'number',
        name: 'items.quantity',
      },
      {
        tag: 'input',
        type: 'number',
        name: 'items.price',
      },
      {
        tag: 'input',
        type: 'number',
        name: 'items.total',
        readonly: true,
        disabled: true,
      },
      {
        tag: 'img',
        src: './assets/trash.svg',
      },
    ],
    footer: [
      {
        label: '+ Add New Item',
        name: 'newItem',
      },
      {
        label: 'Cancel',
        className: 'cancelBtn',
        name: 'cancel',
        newLabel: 'Discard',
      },
      {
        label: 'Save as Draft',
        className: 'saveDraft',
        name: 'draft',
      },
      {
        label: 'Save Changes',
        className: 'saveBtn',
        name: 'save',
        newLabel: 'Save & Send',
      },
    ],
  },
};
