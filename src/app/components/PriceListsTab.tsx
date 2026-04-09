import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileDown, RefreshCw, Plus, Calculator, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const DISTRIBUTORS: Array<{ code: string; name: string }> = [
  { code: '1', name: 'Инкар' },
  { code: '2', name: 'Интерфарма' },
  { code: '3', name: 'Медикус' },
  { code: '4', name: 'Медсервис' },
  { code: '7', name: 'Медиком' },
  { code: '8', name: 'Зерде ТОО НПО' },
  { code: '9', name: 'Комба' },
  { code: '10', name: 'Ромат' },
  { code: '11', name: 'Санжар' },
  { code: '15', name: 'Аманат' },
  { code: '17', name: 'Вива Фарм ТОО' },
  { code: '19', name: 'Ак-Ниет' },
  { code: '20', name: 'Гелика' },
  { code: '23', name: 'Садыхан Фарм-Лидер ТОО' },
  { code: '32', name: 'Аптокс' },
  { code: '33', name: 'МТ-Фарм' },
  { code: '37', name: 'КазМедИмпорт ТОО' },
  { code: '40', name: 'Аделина' },
  { code: '42', name: 'Альба' },
  { code: '43', name: 'АльфарабиФарм' },
  { code: '44', name: 'Асфарм ТОО' },
  { code: '45', name: 'Биола МФК' },
  { code: '47', name: 'Витафарм ТОО' },
  { code: '50', name: 'Dolce Pharm' },
  { code: '51', name: 'Желдорфармация' },
  { code: '58', name: 'Садыхан Премиум' },
  { code: '63', name: 'Медео-Фарм' },
  { code: '64', name: 'Медтехника АО' },
  { code: '67', name: 'Нидиа-Фарм' },
  { code: '69', name: 'ТурСад ТОО' },
  { code: '70', name: 'Тес ТОО' },
  { code: '71', name: 'ФармАктив' },
  { code: '74', name: 'Шаншаров-Фарм ТОО' },
  { code: '77', name: 'Авин Фарма Каз' },
  { code: '80', name: 'Рахат Фарм' },
  { code: '81', name: 'Dosfarm' },
  { code: '83', name: 'Миромед (варитекс)' },
  { code: '85', name: 'Ак Фарма' },
  { code: '86', name: 'Венера' },
  { code: '87', name: 'Достык' },
  { code: '88', name: 'Свободный' },
  { code: '89', name: 'Виталюкс' },
  { code: '90', name: 'Эко-Мир' },
  { code: '91', name: 'Асылфарм' },
  { code: '93', name: 'Росфарма ТОО' },
  { code: '94', name: 'Имкохем' },
  { code: '95', name: 'Фармико' },
  { code: '184', name: 'АктюбФармЦентр ТОО' },
  { code: '186', name: 'Фарм Евро' },
  { code: '189', name: 'ЦентрАзияФарм' },
  { code: '190', name: 'Медком' },
  { code: '216', name: 'Рауза' },
  { code: '217', name: 'MFS Company' },
  { code: '218', name: 'АЗА' },
  { code: '222', name: 'Ранимед' },
  { code: '223', name: 'Талап' },
  { code: '310', name: 'Спектр фарм' },
  { code: '313', name: 'Мак-ИЛ ТОО' },
  { code: '314', name: 'Нео Лайф ТОО' },
  { code: '315', name: 'КазИндФарм ТОО' },
  { code: '323', name: 'Феникс ТОО' },
  { code: '326', name: 'KMS&SERVICE ТОО' },
  { code: '500', name: 'U-Dent Distribution ТОО' },
  { code: '954', name: 'Заман фарм' },
  { code: '955', name: 'Тюменцев' },
  { code: '956', name: 'Aray Pharm' },
  { code: '957', name: 'Планета 03' },
  { code: '958', name: 'Salym Pharma' },
  { code: '978', name: 'ЗАМАН' },
  { code: '979', name: 'SAFIA Фарм ТОО' },
  { code: '980', name: 'IG TREND ТОО' },
  { code: '988', name: 'Альянс-Фарм ТОО' },
  { code: '994', name: 'Ульба-М ТОО' },
  { code: '995', name: 'ЕвроАзияФарм ТОО' },
  { code: '996', name: 'АнсарФарм' },
  { code: '997', name: 'ПК Фирма Кызылмай' },
  { code: '999', name: 'Praktika Pharma' },
  { code: '1000', name: 'Лекавит Фарм ТОО' },
  { code: '1001', name: 'Мурат Фарм ТОО (ATAMIRAS.S)' },
  { code: '1002', name: 'ФортунаМед ТОО' },
  { code: '1003', name: 'Зерде Фито' },
  { code: '1005', name: 'Тестовое, не заказывать!' },
  { code: '1006', name: 'АлВит ТОО' },
  { code: '1007', name: 'Ада Фарм' },
  { code: '1008', name: 'KAZTAB' },
  { code: '1009', name: 'LOGOS' },
  { code: '1010', name: 'Мерей' },
  { code: '1011', name: 'Сауит' },
  { code: '1012', name: 'КазынаФарм' },
  { code: '1013', name: 'TROKA-S PHARMA' },
  { code: '1014', name: 'Mladex ТОО' },
  { code: '1015', name: 'Дэри-Дармек ТОО' },
  { code: '1016', name: 'Илья' },
  { code: '1017', name: 'ВК Центрофарм ТОО' },
  { code: '1018', name: 'Атамирас ТОО (ATAMIRAS.S)' },
  { code: '1019', name: 'KVERNER GROUP ТОО' },
  { code: '1020', name: 'Фармация 2010 (Казына Фарм)' },
  { code: '1021', name: 'Дарысын ТОО' },
  { code: '1022', name: 'LICOPM ТОО' },
  { code: '1023', name: 'Полина ТОО' },
  { code: '1024', name: 'КазБАД ТОО' },
  { code: '1025', name: 'Кеана Люкс Интернешнл' },
  { code: '1026', name: 'Казмедиал ТОО' },
  { code: '1027', name: 'Orphan pharmaceuticals' },
  { code: '1028', name: 'Asida-Pharma ТОО' },
  { code: '1029', name: 'Аксель и А ТОО' },
  { code: '1030', name: 'Кристалл' },
  { code: '1031', name: 'Беласар ТОО' },
  { code: '1032', name: 'Туран ТОО' },
  { code: '1033', name: 'Avcare ТОО' },
  { code: '1034', name: 'IVF FARM ТОО' },
  { code: '1035', name: 'TAU MEDICA TRADE' },
  { code: '1036', name: 'Контакт ТОО' },
  { code: '1037', name: 'Вега' },
  { code: '1038', name: 'Eva-Phyto ТОО' },
  { code: '1039', name: 'Азияфарм бизнес' },
  { code: '1040', name: 'MEDIX ТОО' },
  { code: '3000', name: 'Bradex и Naomi' },
  { code: '5058', name: 'Садыхан все товары' },
  { code: '5059', name: 'Ремедиум' },
  { code: '5060', name: 'Тестовый Дистрибьютор' },
  { code: '6000', name: 'Asap pharm' },
  { code: '6001', name: 'НВФ КызылМай' },
  { code: '6002', name: 'OASIS-Сауда' },
  { code: '6003', name: 'Dolce - Pharm' },
  { code: '6005', name: 'АлМед Плюс ТОО' },
  { code: '6006', name: 'MaxpharmТОО' },
  { code: '6007', name: 'Consult Asia ТОО' },
  { code: '6008', name: 'Ак-Ниет ТОВАР ДНЯ' },
  { code: '6009', name: 'ЗердеФарм' },
  { code: '6010', name: 'IMEX TRD' },
  { code: '6011', name: 'Biopharma ТОО' },
  { code: '6013', name: 'Жайик-AS ТОО' },
  { code: '6014', name: 'ОАД-27' },
  { code: '6015', name: 'Султан ТОО' },
  { code: '6016', name: 'Эко-Фарм ТОО' },
  { code: '6017', name: 'Ак-Ниет (индивидуальный прайс)' },
  { code: '6018', name: 'BB Farm' },
  { code: '6019', name: 'TimParm ТОО' },
  { code: '6020', name: 'K & K ELITE ТОО' },
  { code: '6021', name: 'Арша ТОО' },
  { code: '6022', name: 'Витайм ТОО' },
  { code: '6023', name: 'Medservice group' },
  { code: '6024', name: 'Витайм ТОО-1 (БАД/косметика)' },
  { code: '6025', name: 'Фармикум ТОО' },
  { code: '6026', name: 'Атамирас (тестовый)' },
  { code: '6027', name: 'Фарм Медика Саудасы ТОО' },
  { code: '6028', name: 'Фармцентр дистрибьюшн' },
  { code: '6029', name: 'Алиязфарм' },
  { code: '6031', name: 'Med-NTR ТОО' },
  { code: '6032', name: 'PN KAZAKHSTAN ТОО' },
  { code: '6034', name: 'Pharmprovide ТОО' },
  { code: '6035', name: 'Farma Marketing ТОО' },
  { code: '6036', name: 'ФитоМед ТОО' },
  { code: '6037', name: 'SBK Company' },
  { code: '6038', name: 'Tonus Elast ООО' },
  { code: '6039', name: 'Curae Pharma ТОО' },
  { code: '6040', name: 'Mega pharm ТОО' },
  { code: '6041', name: 'Шамсун ТОО' },
  { code: '6042', name: 'SAUDA TRADE LTD ТОО' },
  { code: '6044', name: 'Import Logistics' },
  { code: '6045', name: 'Империя заботы ТОО' },
  { code: '6046', name: 'Алматы Оптика ТОО' },
  { code: '6047', name: 'JULDYZ KENAN ТОО' },
  { code: '6048', name: 'Фармцентр (подходящие сроки)' },
  { code: '6049', name: 'Фармцентр (за нал)' },
  { code: '6050', name: 'Prima Distribution' },
  { code: '6051', name: 'NAMA GROUP ТОО' },
  { code: '6052', name: 'KAZRAFARM ТОО' },
  { code: '6053', name: 'PARASAT PHARMA MEDICAL ТОО' },
  { code: '6054', name: 'KazImpExTrade ТОО' },
  { code: '6055', name: 'TAMER FARM ИП' },
  { code: '6056', name: 'Remedy ТОО' },
  { code: '6057', name: 'Sante Group ТОО' },
  { code: '6058', name: 'VGL Company' },
  { code: '6059', name: 'Кеана Люкс Интернешнл ТОО' },
  { code: '6060', name: 'Стофарм (средняя цена)' },
  { code: '6061', name: 'Эмити Интернешнл (средняя цена)' },
  { code: '6062', name: 'АспанМедСервис ТОО' },
  { code: '6063', name: 'Тенре-Аэролайф ТОО' },
  { code: '6064', name: 'Sokol Grand ТОО' },
  { code: '6065', name: 'DiaPharm BS ТОО' },
  { code: '6066', name: 'Mega Pharma ТОО' },
  { code: '6067', name: 'Special Oil Projects LLC' },
  { code: '6068', name: 'Ангрофарм-НС ТОО' },
  { code: '6069', name: 'Чингиз ТОО' },
  { code: '6070', name: 'ProfMedPharm ТОО' },
  { code: '6071', name: 'ОПТИ' },
  { code: '6072', name: 'AKNIET GROUP ТОО' },
  { code: '6073', name: 'AVA Mask' },
  { code: '6074', name: 'Pharma Holding ТОО' },
  { code: '6078', name: 'FamAlliance ТОО' },
  { code: '6079', name: 'Ак-Ниет Оптовый склад ВС' },
  { code: '6080', name: 'Абишева Н ИП' },
  { code: '6081', name: 'Кубера Плюс ТОО' },
  { code: '6082', name: 'Селмур Фармация' },
  { code: '6083', name: 'МЕДЭМ ТОО' },
  { code: '6084', name: 'New wave ltd ТОО' },
  { code: '6085', name: 'НеоТекФарм ТОО' },
  { code: '6217', name: 'MEROS PHARM' },
];

const PHCENTER_DEFAULT_DISTRIBUTORS: string[] = DISTRIBUTORS
  .map((d) => String(d.code))
  .filter((code) => {
    const n = Number(code);
    return Number.isFinite(n) && n >= 2 && n <= 50;
  });

// Provisor filial IDs by city (from Помощник.md).
// Key is ph.center region / Provisor cityId.
const PROVISOR_FILIALS_BY_REGION: Record<string, Array<{ id: number; name: string }>> = {
  '1': [
    { id: 128, name: 'Инкар (Алматы)' },
    { id: 1052, name: 'Эмити Интернешнл (Алматы)' },
    { id: 1075, name: 'Аманат (Алматы)' },
    { id: 1397, name: 'Зерде ТОО НПО (Алматы)' },
    { id: 8322, name: 'Атамирас (Алматы)' },
  ],
  '2': [
    { id: 149, name: 'Медсервис (Астана)' },
    { id: 1076, name: 'Эмити Интернешнл (Астана)' },
  ],
  '3': [
    { id: 159, name: 'Медсервис (Актау)' },
    { id: 1106, name: 'Эмити Интернешнл (Актау)' },
  ],
  '4': [{ id: 162, name: 'Медсервис (Актобе)' }],
  '5': [{ id: 1392, name: 'Медсервис (Атырау)' }],
  '6': [{ id: 148, name: 'Медсервис (Караганда)' }],
  '8': [
    { id: 154, name: 'Медсервис (Костанай)' },
    { id: 1108, name: 'Эмити Интернешнл (Костанай)' },
  ],
  '9': [{ id: 158, name: 'Медсервис (Кызылорда)' }],
  '10': [
    { id: 155, name: 'Медсервис (Павлодар)' },
    { id: 1111, name: 'Эмити Интернешнл (Павлодар)' },
  ],
  '11': [{ id: 1149, name: 'Эмити Интернешнл (Петропавловск)' }],
  '13': [{ id: 151, name: 'Медсервис (Талдыкорган)' }],
  '15': [
    { id: 153, name: 'Медсервис (Уральск)' },
    { id: 1114, name: 'Эмити Интернешнл (Уральск)' },
  ],
  '16': [{ id: 152, name: 'Медсервис (Усть-Каменогорск)' }],
  '17': [
    { id: 1107, name: 'Эмити Интернешнл (Шымкент)' },
    { id: 1145, name: 'Атамирас (Шымкент)' },
  ],
};

interface PriceList {
  id: string;
  date: string;
  number: string;
  format: string;
  activationDate: string;
  user: string;
  status?: string;
  branch?: string;
}

interface GeneratedItem {
  sku: string;
  name: string;
  price: number;
  cost?: number;
  competitorPrice?: number | null;
  zone?: string;
}

type ImportedProductRow = {
  sku: string;
  name: string;
  stock: number | null;
  manufacturer: string;
  costPrice: number;
  competitorPrices: number[];
  modelPrice: number | null;
};

type PriceListsTabProps = {
  formatCode: string;
  onPriceFormatsChanged?: (selectCode?: string) => void | Promise<void>;
};

export function PriceListsTab({ formatCode, onPriceFormatsChanged }: PriceListsTabProps) {
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<{ price_list_id: string; items: GeneratedItem[]; stats?: any } | null>(null);
  const [selectedPriceListNumber, setSelectedPriceListNumber] = useState<string | null>(null);
  const [region, setRegion] = useState<string>('8');
  const [priceMode, setPriceMode] = useState<string>('0');
  const [selectedDistributors, setSelectedDistributors] = useState<string[]>(PHCENTER_DEFAULT_DISTRIBUTORS);
  const [distributorToAdd, setDistributorToAdd] = useState<string>(PHCENTER_DEFAULT_DISTRIBUTORS[0] ?? '4');
  const [distributorFilter, setDistributorFilter] = useState('');

  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [newPriceFormatName, setNewPriceFormatName] = useState<string>('');
  const [productsView, setProductsView] = useState<ImportedProductRow[] | null>(null);
  const [modelPriceListNumber, setModelPriceListNumber] = useState<string | null>(null);

  const runWithLoading = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e: any) {
      setError(e?.message || 'Ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const parseJsonOrNull = (text: string) => {
    const t = String(text || '').trim();
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
      return null;
    }
  };

  const getEffectiveFormatCode = (override?: string) => String(override ?? formatCode ?? '').trim();

    const fetchProductsWithPrices = async (
      priceListNumber?: string | null,
      formatCodeOverride?: string,
      regionOverride?: string | null
    ) => {
        const effFormatCode = getEffectiveFormatCode(formatCodeOverride);
        if (!effFormatCode) {
          setProductsView(null);
          return;
        }
        const q = new URLSearchParams({ format_code: effFormatCode });
        const r = String(regionOverride ?? region ?? '').trim();
        if (r) q.set('region', r);
      const pln = (priceListNumber ?? modelPriceListNumber ?? '').trim();
      if (pln) q.set('price_list_number', pln);
      const res = await fetch(`/api/products/with-competitor-prices?${q.toString()}`);
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось загрузить таблицу товаров');
      if (!Array.isArray(data)) throw new Error('Неожиданный ответ таблицы товаров');
      setProductsView(
        data.map((x: any) => ({
          sku: String(x?.sku ?? ''),
          name: String(x?.name ?? ''),
          stock: x?.stock != null ? Number(x.stock) : null,
          manufacturer: String(x?.manufacturer ?? ''),
          costPrice: x?.costPrice != null ? Number(x.costPrice) : 0,
          competitorPrices: Array.isArray(x?.competitorPrices) ? x.competitorPrices.map((n: any) => Number(n)).filter((n: any) => Number.isFinite(n)) : [],
          modelPrice: x?.modelPrice != null && Number.isFinite(Number(x.modelPrice)) ? Number(x.modelPrice) : null,
        }))
      );
  };

  const loadProductsWithPrices = async (regionOverride?: string | null) => {
    await runWithLoading(() => fetchProductsWithPrices(null, undefined, regionOverride));
  };

  const persistPhCenterPrices = async (formatCodeOverride?: string) => {
    const effFormatCode = getEffectiveFormatCode(formatCodeOverride);
    if (!effFormatCode) {
      throw new Error('Сначала создайте или выберите ценовой формат');
    }

    const distributorsParam = selectedDistributors
      .map((x) => x.trim())
      .filter(Boolean)
      .join(',');

    if (!distributorsParam) {
      throw new Error('Выберите хотя бы одного дистрибьютора (ph.center)');
    }

    const q = new URLSearchParams({
      region,
      price_mode: priceMode,
      distributors: distributorsParam,
      persist: '1',
      persist_only: '1',
      format_code: effFormatCode,
    });

    const res = await fetch(`/api/ph-center/prices-analysis?${q.toString()}`);
    const text = await res.text();
    const data = parseJsonOrNull(text);
    if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось загрузить цены конкурентов');
    if (data?._persist && data._persist.ok === false) throw new Error(data._persist.error || 'Не удалось сохранить цены конкурентов');
  };

  const persistProvisorPricesAll = async (formatCodeOverride?: string): Promise<string[]> => {
    const effFormatCode = getEffectiveFormatCode(formatCodeOverride);
    if (!effFormatCode) {
      throw new Error('Сначала создайте или выберите ценовой формат');
    }

    const filials = PROVISOR_FILIALS_BY_REGION[region] || [];
    if (!filials.length) {
      throw new Error('Для выбранного региона нет настроенных прайсов Provisor');
    }

    const errors: string[] = [];
    let okCount = 0;

    for (const filial of filials) {
      const q = new URLSearchParams({
        filialId: String(filial.id),
        persist: '1',
        persist_only: '1',
        format_code: effFormatCode,
      });

      // eslint-disable-next-line no-await-in-loop
      try {
        const res = await fetch(`/api/provisor/prices?${q.toString()}`);
        // eslint-disable-next-line no-await-in-loop
        const text = await res.text();
        // eslint-disable-next-line no-await-in-loop
        const data = parseJsonOrNull(text);
        if (!res.ok) {
          errors.push(`${filial.id} — ${filial.name}: ${(data && (data.detail || data.message)) || text || 'HTTP ошибка'}`);
          continue;
        }
        if (data?._persist && data._persist.ok === false) {
          errors.push(`${filial.id} — ${filial.name}: ${data._persist.error || 'persist failed'}`);
          continue;
        }
        okCount += 1;
      } catch (e: any) {
        errors.push(`${filial.id} — ${filial.name}: ${e?.message || 'ошибка запроса'}`);
      }
    }

    if (okCount === 0) {
      throw new Error(errors[0] || 'Не удалось загрузить прайсы Provisor');
    }

    return errors;
  };

  const uploadProductsExcel = async () => {
    if (!excelFile) {
      setError('Выберите Excel файл (.xlsx)');
      return;
    }

    await runWithLoading(async () => {
      let targetFormatCode = getEffectiveFormatCode();
      let createdFormatCode: string | null = null;

      const desiredName = newPriceFormatName.trim();
      if (!targetFormatCode && !desiredName) {
        throw new Error('Введите название нового ценового формата');
      }
      if (desiredName) {
        const REGION_TO_BRANCH: Record<string, string> = {
          '1': 'Алматы',
          '2': 'Астана',
          '3': 'Актау',
          '4': 'Актобе',
          '5': 'Атырау',
          '6': 'Караганда',
          '8': 'Костанай',
          '9': 'Кызылорда',
          '10': 'Павлодар',
          '11': 'Петропавловск',
          '13': 'Талдыкорган',
          '15': 'Уральск',
          '16': 'Усть-Каменогорск',
          '17': 'Шымкент',
        };

        const branch = REGION_TO_BRANCH[String(region)] || '';
        const resCreate = await fetch('/api/price-formats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: desiredName, branch }),
        });
        const textCreate = await resCreate.text();
        const dataCreate = parseJsonOrNull(textCreate);
        if (!resCreate.ok) {
          throw new Error(
            (dataCreate && (dataCreate.detail || dataCreate.message)) ||
              textCreate ||
              'Не удалось создать ценовой формат'
          );
        }

        const createdCode = String(dataCreate?.code ?? '').trim();
        if (createdCode) {
          targetFormatCode = createdCode;
          createdFormatCode = createdCode;
        }
        setNewPriceFormatName('');
      }

      const fd = new FormData();
      fd.append('file', excelFile);
      const res = await fetch('/api/products/upload-excel', {
        method: 'POST',
        body: fd,
      });
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось загрузить Excel');

      // новая номенклатура — старая модельная цена неактуальна
      setModelPriceListNumber(null);

      // Автосинк: ph.center -> Provisor (в фоне, без больших payload)
      const warnings: string[] = [];

      try {
        await persistPhCenterPrices(targetFormatCode);
      } catch (e: any) {
        warnings.push(`ph.center: ${e?.message || 'ошибка'}`);
      }

      try {
        const errs = await persistProvisorPricesAll(targetFormatCode);
        if (errs.length) warnings.push(`Provisor: часть прайсов не загрузилась (${errs.length})`);
      } catch (e: any) {
        warnings.push(`Provisor: ${e?.message || 'ошибка'}`);
      }

      await fetchProductsWithPrices(null, targetFormatCode, region);

      if (createdFormatCode) {
        await onPriceFormatsChanged?.(createdFormatCode);
      }

      if (warnings.length) {
        setError(warnings.join(' | '));
      }
    });
  };

  const loadPriceLists = async () => {
    if (!getEffectiveFormatCode()) {
      setPriceLists([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/price-lists?format_code=${encodeURIComponent(formatCode)}`);
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) {
        throw new Error((data && (data.detail || data.message)) || text || 'Не удалось загрузить прайс-листы');
      }
      if (Array.isArray(data)) {
        setPriceLists(
          data.map((x: any, idx: number) => ({
            id: String(x.number ?? idx),
            date: String(x.date ?? ''),
            number: String(x.number ?? ''),
            format: String(x.format ?? ''),
            activationDate: String(x.activationDate ?? ''),
            user: String(x.user ?? ''),
            status: x.status ? String(x.status) : undefined,
            branch: x.branch ? String(x.branch) : undefined,
          }))
        );
      }
    } catch (e: any) {
      setError(e?.message || 'Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  };

  const syncRegionFromFormatBranch = async (): Promise<string | null> => {
    if (!getEffectiveFormatCode()) return null;
    try {
      const res = await fetch(`/api/price-formats/${encodeURIComponent(formatCode)}/settings`);
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) return null;
      const branch = String(data?.branch ?? '').trim();
      const BRANCH_TO_REGION: Record<string, string> = {
        'Алматы': '1',
        'Астана': '2',
        'Нур-Султан': '2',
        'Нурсултан': '2',
        'Шымкент': '17',
        'Караганда': '6',
        'Костанай': '8',
        'Актау': '3',
        'Актобе': '4',
        'Атырау': '5',
        'Павлодар': '10',
        'Кызылорда': '9',
        'Петропавловск': '11',
        'Талдыкорган': '13',
        'Уральск': '15',
        'Усть-Каменогорск': '16',
      };
      const next = BRANCH_TO_REGION[branch];
      if (next) {
        setRegion(next);
        return next;
      }
      return null;
    } catch {
      // ignore
      return null;
    }
  };

  const generatePriceList = async () => {
    if (!getEffectiveFormatCode()) {
      setError('Сначала создайте или выберите ценовой формат');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-price-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format_code: formatCode,
          region: Number(region),
          user: 'UI',
        }),
      });
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось сформировать прайс');
      setGenerated(data);
      if (data?.price_list_id) {
        const pln = String(data.price_list_id);
        setModelPriceListNumber(pln);
        try {
          localStorage.setItem(`lastPriceList:${formatCode}`, pln);
        } catch {
          // ignore
        }
        await fetchProductsWithPrices(pln);
      }
      await loadPriceLists();
    } catch (e: any) {
      setError(e?.message || 'Ошибка формирования');
    } finally {
      setIsLoading(false);
    }
  };

  const recalcSelectedPriceList = async () => {
    if (!getEffectiveFormatCode()) {
      setError('Сначала создайте или выберите ценовой формат');
      return;
    }
    const number = selectedPriceListNumber || generated?.price_list_id;
    if (!number) {
      setError('Сначала выберите прайс-лист из таблицы');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-price-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format_code: formatCode,
          price_list_number: number,
          region: Number(region),
          user: 'UI',
        }),
      });
      const text = await res.text();
      const data = parseJsonOrNull(text);
      if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось пересчитать цены');
      setGenerated(data);
      if (data?.price_list_id) {
        const pln = String(data.price_list_id);
        setModelPriceListNumber(pln);
        try {
          localStorage.setItem(`lastPriceList:${formatCode}`, pln);
        } catch {
          // ignore
        }
        await fetchProductsWithPrices(pln);
      }
      await loadPriceLists();
    } catch (e: any) {
      setError(e?.message || 'Ошибка пересчёта');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompetitorPrices = async () => {
    await runWithLoading(async () => {
      await persistPhCenterPrices();
      await fetchProductsWithPrices();
    });
  };

  const loadProvisorPrices = async () => {
    await runWithLoading(async () => {
      await persistProvisorPricesAll();
      await fetchProductsWithPrices();
    });
  };

  const downloadExport = async () => {
    const number = selectedPriceListNumber || generated?.price_list_id;
    if (!number) {
      setError('Сначала выберите или сформируйте прайс-лист');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/price-lists/${encodeURIComponent(number)}/export.csv`);
      const blob = await res.blob();

      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const text = await blob.text();
          const parsed = parseJsonOrNull(text);
          detail = (parsed && (parsed.detail || parsed.message)) || text || detail;
        } catch {
          // ignore
        }
        throw new Error(detail);
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${number}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e?.message || 'Не удалось скачать');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!getEffectiveFormatCode()) {
        setPriceLists([]);
        setProductsView(null);
        setGenerated(null);
        setSelectedPriceListNumber(null);
        return;
      }
      const nextRegion = await syncRegionFromFormatBranch();
      if (cancelled) return;
      await loadPriceLists();
      if (cancelled) return;
      await loadProductsWithPrices(nextRegion ?? null);
    })().catch(() => {
      // ignore
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatCode]);

  const filteredLists = priceLists.filter((list) =>
    Object.values(list).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const zoneLabel = (z?: string) => {
    if (z === 'left') return 'ЛП';
    if (z === 'optimal') return 'ЗЛ';
    if (z === 'right') return 'ПП';
    return 'НПС';
  };

  const fmtNumber = (v: number | null | undefined) => {
    if (v === null || v === undefined || Number.isNaN(v)) return '—';
    // keep it simple: show without trailing zeros when possible
    return Number(v).toLocaleString('ru-RU');
  };

  const fmtPrices = (arr: number[]) => {
    if (!arr || !arr.length) return '—';
    return arr.map((x) => fmtNumber(x)).join(' · ');
  };

  const renderCompetitorPrices = (arr: number[]) => {
    if (!arr || !arr.length) return <span className="text-gray-500">—</span>;
    const min = Math.min(...arr);
    return (
      <div className="flex flex-wrap items-center gap-1">
        {arr.map((x, idx) => (
          <Badge
            key={`${idx}-${x}`}
            variant={x === min ? 'secondary' : 'outline'}
            className="tabular-nums"
            title={`ТОП-${idx + 1}`}
          >
            {idx + 1}: {fmtNumber(x)}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-56">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Алматы</SelectItem>
                  <SelectItem value="2">Нур-Султан</SelectItem>
                  <SelectItem value="3">Актау</SelectItem>
                  <SelectItem value="4">Актобе</SelectItem>
                  <SelectItem value="5">Атырау</SelectItem>
                  <SelectItem value="6">Караганда</SelectItem>
                  <SelectItem value="7">Кокшетау</SelectItem>
                  <SelectItem value="8">Костанай</SelectItem>
                  <SelectItem value="9">Кызылорда</SelectItem>
                  <SelectItem value="10">Павлодар</SelectItem>
                  <SelectItem value="11">Петропавловск</SelectItem>
                  <SelectItem value="12">Семей</SelectItem>
                  <SelectItem value="13">Талдыкорган</SelectItem>
                  <SelectItem value="14">Тараз</SelectItem>
                  <SelectItem value="15">Уральск</SelectItem>
                  <SelectItem value="16">Усть-Каменогорск</SelectItem>
                  <SelectItem value="17">Шымкент</SelectItem>
                  <SelectItem value="18">Кордай</SelectItem>
                  <SelectItem value="19">Иссык</SelectItem>
                  <SelectItem value="21">Жезказган</SelectItem>
                  <SelectItem value="22">Балхаш</SelectItem>
                  <SelectItem value="23">Щучинск</SelectItem>
                  <SelectItem value="24">Степногорск</SelectItem>
                  <SelectItem value="25">Атбасар</SelectItem>
                  <SelectItem value="26">Рудный</SelectItem>
                  <SelectItem value="27">Экибастуз</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-72">
              <Select value={distributorToAdd} onValueChange={setDistributorToAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="Добавить дистрибьютора" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Фильтр дистрибьютора..."
                      value={distributorFilter}
                      onChange={(e) => setDistributorFilter(e.target.value)}
                    />
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const code = distributorToAdd.trim();
                          if (!code) return;
                          setSelectedDistributors((prev) => (prev.includes(code) ? prev : [...prev, code]));
                        }}
                      >
                        Добавить
                      </Button>
                    </div>
                  </div>
                  {DISTRIBUTORS.filter((d) => {
                    const q = distributorFilter.trim().toLowerCase();
                    if (!q) return true;
                    return d.code.includes(q) || d.name.toLowerCase().includes(q);
                  }).map((d) => (
                    <SelectItem key={d.code} value={d.code}>
                      {d.code} — {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDistributors.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedDistributors.map((code) => {
                    const name = DISTRIBUTORS.find((d) => d.code === code)?.name;
                    return (
                      <span
                        key={code}
                        className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded border bg-gray-50"
                      >
                        {code}{name ? ` — ${name}` : ''}
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-900"
                          onClick={() => setSelectedDistributors((prev) => prev.filter((x) => x !== code))}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadPriceLists} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить данные
          </Button>
          <Button variant="outline" size="sm" onClick={recalcSelectedPriceList} disabled={isLoading}>
            <Calculator className="h-4 w-4 mr-2" />
            Пересчитать цены
          </Button>
          <Button variant="outline" size="sm" onClick={downloadExport} disabled={isLoading}>
            <FileDown className="h-4 w-4 mr-2" />
            Скачать Excel
          </Button>
          <Button variant="outline" size="sm" onClick={loadCompetitorPrices} disabled={isLoading}>
            Загрузить цены конкурентов
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadProvisorPrices}
            disabled={isLoading}
          >
            Загрузить прайс Provisor
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={generatePriceList} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            Сформировать прайс
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
        <div className="text-sm font-semibold text-gray-900">Загрузка Excel (товары)</div>
        <div className="flex items-center gap-3 flex-wrap">
          <Input
            placeholder="Название прайс-листа (новый ценовой формат)"
            value={newPriceFormatName}
            onChange={(e) => setNewPriceFormatName(e.target.value)}
            className="max-w-sm"
          />
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => setExcelFile(e.target.files?.[0] ?? null)}
            className="max-w-sm"
          />
          <Button variant="outline" size="sm" onClick={uploadProductsExcel} disabled={isLoading}>
            Загрузить Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadProductsWithPrices(null)} disabled={isLoading}>
            Обновить таблицу товаров
          </Button>
          <div className="text-xs text-gray-500">
            SKU нормализуется до 18 цифр (дописываем нули слева).
          </div>
        </div>
      </div>

      {error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : null}

      {productsView ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm text-gray-700">
            Таблица товаров (Excel) + ТОП‑5 цен конкурентов
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Остатки</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Производитель</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Себестоимость</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Цены конкурентов (ТОП‑5)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Модельная цена</th>
                </tr>
              </thead>
              <tbody>
                {productsView.map((row) => (
                  <tr key={row.sku} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{row.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtNumber(row.stock)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.manufacturer}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtNumber(row.costPrice)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{renderCompetitorPrices(row.competitorPrices)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{fmtNumber(row.modelPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Дата
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Номер
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Ценовой формат
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Дата активации
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Пользователь
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLists.map((list) => (
                <tr
                  key={list.id}
                  onClick={() => setSelectedPriceListNumber(list.number)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {list.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {list.number}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {list.format}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {list.activationDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {list.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {generated?.items?.length ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm text-gray-700">
            Результат расчёта: {generated.price_list_id}
            {generated.stats ? (
              <span className="ml-3 text-gray-600">
                ЛП: {generated.stats.lp} · ЗЛ: {generated.stats.zl} · ПП: {generated.stats.pp} · Нет МЦК: {generated.stats.no_mck}
              </span>
            ) : null}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Наименование</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Себестоимость</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">МЦК</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Итоговая цена</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Сегмент</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Отклонение</th>
                </tr>
              </thead>
              <tbody>
                {generated.items.map((row) => (
                  <tr key={row.sku} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900">{row.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{fmtNumber(row.cost)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{fmtNumber(row.competitorPrice ?? null)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{fmtNumber(row.price)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{zoneLabel(row.zone)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {row.competitorPrice && row.competitorPrice > 0
                        ? `${(((row.price - row.competitorPrice) / row.competitorPrice) * 100).toFixed(1)}%`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

    </div>
  );
}
