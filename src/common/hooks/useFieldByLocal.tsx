import { useLocaleState } from '../../i18n';

export const useFieldByLocal = (): { getFieldNameByLocal: () => string } => {
  const { locale } = useLocaleState();

  const getFieldNameByLocal = () => {
    const locales: any = {
      ar: 'nameAr',
      en: 'name',
      fr: 'nameFr',
    };

    return locales[locale ?? 'fr'];
  };

  return { getFieldNameByLocal };
};
