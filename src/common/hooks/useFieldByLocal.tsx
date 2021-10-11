import { useTranslation } from 'react-i18next';

type LocalName = 'name' | 'nameFr' | 'nameAr';

export const useFieldByLocal = (): { getFieldNameByLocal: () => LocalName } => {
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
