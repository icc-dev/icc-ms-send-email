import { validationData } from './controllers.utils';

describe('validationData', () => {
  it(`Should return Does't provide email data - null data`, () => {
    try {
      validationData(null);
    } catch (error) {
      expect(error.error).toEqual(`Does't provide email data`);
    }
  });

  it(`Should return Does't provide email data - empty data`, () => {
    try {
      validationData({} as any);
    } catch (error) {
      expect(error.error).toEqual(`Does't provide email data`);
    }
  });

  describe(`Should return Does't provide templateId`, () => {
    it(`when templateId is undefined`, () => {
      try {
        validationData({
          to: 'to',
          attachment: {
            content: null,
            filename: null,
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(`Does't provide templateId`);
      }
    });
    it(`when templateId is null`, () => {
      try {
        validationData({
          templateId: null,
        } as any);
      } catch (error) {
        expect(error.error).toEqual(`Does't provide templateId`);
      }
    });
  });

  describe(`Does't provide to email addresse`, () => {
    it(`when to is undefined`, () => {
      try {
        validationData({
          templateId: 'templateId',
        } as any);
      } catch (error) {
        expect(error.error).toEqual(`Does't provide to email addresse`);
      }
    });
    it(`when to is null`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: null,
        } as any);
      } catch (error) {
        expect(error.error).toEqual(`Does't provide to email addresse`);
      }
    });
  });

  describe(`Receive attachment without content or filename`, () => {
    it(`when attachment is empty`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {},
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain properties null`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: null,
            filename: null,
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain content property null`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: null,
            filename: 'file.txt',
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain content property is undefined`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            filename: 'file.txt',
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain content property is empty`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: '',
            filename: 'file.txt',
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain filename property is null`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: 'content',
            filename: null,
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain filename property is undefined`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: 'content',
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
    it(`when attachment contain filename property is empty`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to',
          attachment: {
            content: 'content',
            filename: '',
          },
        } as any);
      } catch (error) {
        expect(error.error).toEqual(
          `Receive attachment without content or filename`,
        );
      }
    });
  });

  describe('called without error', () => {
    it(`when attachment not provide`, () => {
      try {
        validationData({
          templateId: 'templateId',
          to: 'to'
        } as any);
      } catch (error) {
        expect(error).not.toBeDefined();
      }
    });
  });
});
