import { useTranslation } from 'react-i18next';

export const useFieldByLocal = (): { getFieldNameByLocal: () => 'name'|'nameFr'|'nameAr' } => {
  const { i18n } = useTranslation();

  const getFieldNameByLocal = () => {
    const locales: any = {
      ar: 'nameAr',
      en: 'name',
      fr: 'nameFr',
    };

    return locales[i18n.language];
  };

  return { getFieldNameByLocal };
};
