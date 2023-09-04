import { IItemList } from './searchType';

export const EmptyDataItemList: IItemList = {
  limit: 10,
  offset: 1,
  count: 1,
  total: 1,
  results: [
    {
      id: '',
      version: 1,
      productType: {
        typeId: '',
        id: '',
      },
      taxCategory: {
        typeId: '',
        id: '',
      },
      name: {
        'en-GB': '',
      },
      description: {
        'en-GB': '',
      },
      categories: [],
      masterVariant: {
        id: 1,
        prices: [
          {
            country: '',
            customerGroup: {
              typeId: '',
              id: '',
            },
            discounted: {
              value: {
                centAmount: 1,
                currencyCode: '',
                fractionDigits: 1,
                type: '',
              },
              discount: {
                id: '',
                typeId: '',
              },
            },
            id: '',
            key: '',
            value: {
              type: '',
              currencyCode: '',
              centAmount: 1,
              fractionDigits: 1,
            },
          },
        ],
        images: [
          {
            dimensions: { w: 1, h: 1 },
            url: '',
          },
        ],
        attributes: [
          {
            name: '',
            value: {
              it: '',
              de: '',
              en: '',
            },
          },
        ],
      },
      metaDescription: {
        en: '',
      },
      metaTitle: {
        en: '',
      },
      priceMode: '',
      published: true,
      searchKeywords: {},
      slug: {
        en: '',
      },
      variants: [],
    },
  ],
};
