import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useMemo, useState } from 'react';

interface AnalyticsData {
  name: string;
  value: number;
  color: string;
}

interface ClientAnalytics {
  id: string;
  branch: string;
  client: string;
  priceList: string;
  skuCount: number;
  forecastShare: string;
  actualShare: string;
  comment: string;
}

type AnalyticsTabProps = {
  formatCode: string;
};

type Counterparty = {
  code: string;
  holding: string;
  name: string;
  inn?: string;
};

export function AnalyticsTab({ formatCode }: AnalyticsTabProps) {
  const [distributionData, setDistributionData] = useState<AnalyticsData[]>([]);
  const [clientAnalytics, setClientAnalytics] = useState<ClientAnalytics[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePriceList, setActivePriceList] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseJsonOrNull = (text: string) => {
    const t = String(text || '').trim();
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
      return null;
    }
  };

  const storageKey = useMemo(() => `lastPriceList:${formatCode}`, [formatCode]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const remembered = String(localStorage.getItem(storageKey) || '').trim();

        let number = remembered;
        if (!number) {
          const resLists = await fetch(`/api/price-lists?format_code=${encodeURIComponent(formatCode)}`);
          const textLists = await resLists.text();
          const dataLists = parseJsonOrNull(textLists);
          if (!resLists.ok) throw new Error((dataLists && (dataLists.detail || dataLists.message)) || textLists || 'Не удалось загрузить прайс-листы');
          if (Array.isArray(dataLists) && dataLists.length) {
            number = String(dataLists[0]?.number ?? '').trim();
          }
        }

        if (!number) {
          setActivePriceList('');
          setDistributionData([]);
          setClientAnalytics([]);
          return;
        }

        if (!cancelled) {
          setActivePriceList(number);
          localStorage.setItem(storageKey, number);
        }

        const res = await fetch(`/api/price-lists/${encodeURIComponent(number)}/analysis`);
        const text = await res.text();
        const data = parseJsonOrNull(text);
        if (!res.ok) throw new Error((data && (data.detail || data.message)) || text || 'Не удалось загрузить аналитику');

        const distRaw = Array.isArray(data?.distribution) ? data.distribution : [];
        const dist: AnalyticsData[] = distRaw
          .map((x: any, idx: number) => ({
            name: String(x?.name ?? `Сегмент ${idx + 1}`),
            value: Number(x?.value ?? 0),
            color: String(x?.fill ?? '#6b7280'),
          }))
          .filter((x) => Number.isFinite(x.value) && x.value >= 0);

        const skuCount = Array.isArray(data?.products) ? data.products.length : 0;

        const resCp = await fetch(`/api/price-formats/${encodeURIComponent(formatCode)}/counterparties`);
        const textCp = await resCp.text();
        const dataCp = parseJsonOrNull(textCp);
        const cps: Counterparty[] = Array.isArray(dataCp)
          ? dataCp.map((x: any) => ({
              code: String(x?.code ?? ''),
              holding: String(x?.holding ?? ''),
              name: String(x?.name ?? ''),
              inn: x?.inn ? String(x.inn) : undefined,
            }))
          : [];

        const branch = String(data?.meta?.branch ?? '').trim();

        const rows: ClientAnalytics[] = (cps.length ? cps : [{ code: '', holding: '', name: '—' }]).map((c, idx) => ({
          id: `${c.code || idx + 1}`,
          branch: branch || '—',
          client: c.name || '—',
          priceList: number,
          skuCount,
          forecastShare: '—',
          actualShare: '—',
          comment: c.holding ? `Холдинг: ${c.holding}` : '—',
        }));

        if (!cancelled) {
          setDistributionData(dist);
          setClientAnalytics(rows);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Ошибка');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [formatCode, storageKey]);

  const filteredAnalytics = clientAnalytics.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-700">
            Количество: {payload[0].value} SKU
          </p>
          <p className="text-sm text-gray-700">
            Процент: {(
              (payload[0].value /
                (distributionData.reduce((a, b) => a + b.value, 0) || 1)) *
              100
            ).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Распределение товаров по ценовым зонам
        </h3>
        <div className="text-xs text-gray-600 mb-3">
          {activePriceList ? `Прайс-лист: ${activePriceList}` : 'Нет сформированного прайс-листа для анализа'}
        </div>

        {error ? <div className="text-sm text-red-600 mb-3">{error}</div> : null}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => (
                  <span className="text-sm text-gray-700">{entry.payload.name}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {isLoading ? <div className="mt-4 text-sm text-gray-600">Загрузка…</div> : null}
      </div>

      {/* Client Analytics Table */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Аналитика по клиентам
        </h3>
        
        <div className="relative max-w-sm mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Филиал
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Клиент
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Прайс-лист
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Количество SKU
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Доля прогноз
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Доля факт
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Комментарий
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAnalytics.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.branch}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.client}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.priceList}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.skuCount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.forecastShare}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.actualShare}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
