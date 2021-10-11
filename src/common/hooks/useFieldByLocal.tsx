import { useTranslation } from 'react-i18next';

type LocalName = 'ar' | 'en' | 'fr';
type FieldName = 'name' | 'nameFr' | 'nameAr';
type FieldByLocal = { getFieldNameByLocal: () => FieldName };

export const useFieldByLocal = (): FieldByLocal => {
  const { i18n } = useTranslation();

  const getFieldNameByLocal = (): FieldName => {
    const locales: Record<LocalName, FieldName> = {
      ar: 'nameAr',
      en: 'name',
      fr: 'nameFr',
    };

    return locales[i18n.language as LocalName];
  };

  return { getFieldNameByLocal };
};
