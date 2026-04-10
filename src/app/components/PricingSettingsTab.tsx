import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type MarkupRow = {
  id: number;
  lowerBound: string;
  upperBound: string;
  markupPercent: string;
};

type BendRow = {
  id: number;
  priceFrom: string;
  bendPercent: string;
};

type PricingSettingsTabProps = {
  formatCode: string;
  onSaved?: () => void;
};

const DEFAULT_MARKUPS: MarkupRow[] = [
  { id: 1, lowerBound: '0', upperBound: '499.99', markupPercent: '20' },
  { id: 2, lowerBound: '500', upperBound: '999.99', markupPercent: '5' },
  { id: 3, lowerBound: '1000', upperBound: '1999.99', markupPercent: '4' },
  { id: 4, lowerBound: '2000', upperBound: '4999.99', markupPercent: '3' },
  { id: 5, lowerBound: '5000', upperBound: '9999.99', markupPercent: '2.5' },
  { id: 6, lowerBound: '10000', upperBound: '99999999', markupPercent: '2' },
];

const DEFAULT_BENDS: BendRow[] = [
  { id: 1, priceFrom: '0', bendPercent: '0.5' },
  { id: 2, priceFrom: '500', bendPercent: '0.3' },
  { id: 3, priceFrom: '1000', bendPercent: '0.25' },
  { id: 4, priceFrom: '2000', bendPercent: '0.2' },
  { id: 5, priceFrom: '5000', bendPercent: '0.15' },
  { id: 6, priceFrom: '10000', bendPercent: '0.1' },
];

export function PricingSettingsTab({ formatCode, onSaved }: PricingSettingsTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [pricingRule, setPricingRule] = useState('');
  const [deflectionPercent, setDeflectionPercent] = useState('0');
  const [recommendedMarkups, setRecommendedMarkups] = useState<MarkupRow[]>(DEFAULT_MARKUPS);
  const [bendRanges, setBendRanges] = useState<BendRow[]>(DEFAULT_BENDS);

  useEffect(() => {
    setName(formatCode);
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/price-formats/${encodeURIComponent(formatCode)}/settings`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (!res.ok) throw new Error((data && data.detail) || 'Не удалось загрузить настройки');

        setName(String(data?.name ?? formatCode));

        setBranch(String(data?.branch ?? ''));
        setPricingRule(String(data?.pricingRule ?? ''));
        setDeflectionPercent(String(data?.deflectionPercent ?? '0'));

        const rec = Array.isArray(data?.recommendedMarkups) ? data.recommendedMarkups : [];
        if (rec.length) {
          setRecommendedMarkups(
            rec.map((r: any, idx: number) => ({
              id: Number(r?.id ?? idx + 1),
              lowerBound: String(r?.lowerBound ?? ''),
              upperBound: String(r?.upperBound ?? ''),
              markupPercent: String(r?.markupPercent ?? ''),
            }))
          );
        } else {
          setRecommendedMarkups(DEFAULT_MARKUPS);
        }

        const bends = Array.isArray(data?.bendRanges) ? data.bendRanges : [];
        if (bends.length) {
          setBendRanges(
            bends.map((r: any, idx: number) => ({
              id: Number(r?.id ?? idx + 1),
              priceFrom: String(r?.priceFrom ?? ''),
              bendPercent: String(r?.bendPercent ?? ''),
            }))
          );
        } else {
          setBendRanges(DEFAULT_BENDS);
        }
      } catch (e: any) {
        setError(e?.message || 'Ошибка загрузки');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [formatCode]);

  const canSave = useMemo(() => !isLoading, [isLoading]);

  const save = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        name,
        branch,
        pricingRule,
        deflectionPercent: Number(deflectionPercent),
        recommendedMarkups: recommendedMarkups.map((r) => ({
          id: r.id,
          lowerBound: Number(r.lowerBound),
          upperBound: Number(r.upperBound),
          markupPercent: Number(r.markupPercent),
        })),
        bendRanges: bendRanges.map((r) => ({
          id: r.id,
          priceFrom: Number(r.priceFrom),
          bendPercent: Number(r.bendPercent),
        })),
      };

      const res = await fetch(`/api/price-formats/${encodeURIComponent(formatCode)}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      if (!res.ok) throw new Error((data && data.detail) || 'Не удалось сохранить настройки');

      // refresh from server response
      setName(String(data?.name ?? name));
      setBranch(String(data?.branch ?? ''));
      setPricingRule(String(data?.pricingRule ?? ''));
      setDeflectionPercent(String(data?.deflectionPercent ?? '0'));
      if (Array.isArray(data?.recommendedMarkups)) {
        setRecommendedMarkups(
          data.recommendedMarkups.map((r: any, idx: number) => ({
            id: Number(r?.id ?? idx + 1),
            lowerBound: String(r?.lowerBound ?? ''),
            upperBound: String(r?.upperBound ?? ''),
            markupPercent: String(r?.markupPercent ?? ''),
          }))
        );
      }
      if (Array.isArray(data?.bendRanges)) {
        setBendRanges(
          data.bendRanges.map((r: any, idx: number) => ({
            id: Number(r?.id ?? idx + 1),
            priceFrom: String(r?.priceFrom ?? ''),
            bendPercent: String(r?.bendPercent ?? ''),
          }))
        );
      }

      onSaved?.();
    } catch (e: any) {
      setError(e?.message || 'Ошибка сохранения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Form */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Основные параметры ценообразования
        </h3>

        {isLoading ? <div className="text-sm text-gray-600">Загрузка...</div> : null}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Наименование</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="branch">Филиал</Label>
            <Select value={branch || 'none'} onValueChange={(v) => setBranch(v === 'none' ? '' : v)} disabled={isLoading}>
              <SelectTrigger id="branch">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">—</SelectItem>
                <SelectItem value="Астана">Астана</SelectItem>
                <SelectItem value="Алматы">Алматы</SelectItem>
                <SelectItem value="Шымкент">Шымкент</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 col-span-2">
            <Label htmlFor="rule">Правило ценообразования</Label>
            <Select value={pricingRule || 'standard'} onValueChange={setPricingRule} disabled={isLoading}>
              <SelectTrigger id="rule">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Стандартное</SelectItem>
                <SelectItem value="competitive">Конкурентное</SelectItem>
                <SelectItem value="margin">По марже</SelectItem>
                <SelectItem value="fixed">Фиксированное</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="deflection">Прогиб по умолчанию (%)</Label>
            <Input
              id="deflection"
              value={deflectionPercent}
              onChange={(e) => setDeflectionPercent(e.target.value)}
              disabled={isLoading}
            />
            <div className="text-xs text-gray-500">
              Используется как запасной вариант, если таблица прогиба ниже пустая.
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={save} disabled={!canSave}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить настройки
          </Button>
        </div>
      </div>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      {/* Markup Rules Table */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Таблица рекомендуемых наценок
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-16">
                    №
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Нижняя граница
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Верхняя граница
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Наценка
                  </th>
                </tr>
              </thead>
              <tbody>
                {recommendedMarkups.map((rule) => (
                  <tr
                    key={rule.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {rule.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <Input
                        value={rule.lowerBound}
                        disabled={isLoading}
                        onChange={(e) =>
                          setRecommendedMarkups((prev) =>
                            prev.map((x) => (x.id === rule.id ? { ...x, lowerBound: e.target.value } : x))
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <Input
                        value={rule.upperBound}
                        disabled={isLoading}
                        onChange={(e) =>
                          setRecommendedMarkups((prev) =>
                            prev.map((x) => (x.id === rule.id ? { ...x, upperBound: e.target.value } : x))
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <Input
                        value={rule.markupPercent}
                        disabled={isLoading}
                        onChange={(e) =>
                          setRecommendedMarkups((prev) =>
                            prev.map((x) => (x.id === rule.id ? { ...x, markupPercent: e.target.value } : x))
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Таблица прогиба по цене конкурента
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-16">№</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Цена от</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Прогиб (%)</th>
                </tr>
              </thead>
              <tbody>
                {bendRanges.map((rule) => (
                  <tr key={rule.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{rule.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <Input
                        value={rule.priceFrom}
                        disabled={isLoading}
                        onChange={(e) =>
                          setBendRanges((prev) =>
                            prev.map((x) => (x.id === rule.id ? { ...x, priceFrom: e.target.value } : x))
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <Input
                        value={rule.bendPercent}
                        disabled={isLoading}
                        onChange={(e) =>
                          setBendRanges((prev) =>
                            prev.map((x) => (x.id === rule.id ? { ...x, bendPercent: e.target.value } : x))
                          )
                        }
                      />
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
