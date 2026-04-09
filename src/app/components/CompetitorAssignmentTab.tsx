import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Eye, ArrowDown } from 'lucide-react';
import { useState } from 'react';

interface CompetitorPriceList {
  id: string;
  supplier: string;
  priceDate: string;
  name: string;
  region: string;
}

interface SelectedPriceList {
  id: string;
  coefficient: string;
  supplier: string;
  priceDate: string;
  name: string;
}

const mockCompetitorLists: CompetitorPriceList[] = [
  // Provisor filial pricelists (from Помощник.md)
  { id: '128', supplier: 'Инкар', priceDate: '—', name: 'Инкар (Алматы)', region: 'Алматы' },
  { id: '148', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Караганда)', region: 'Караганда' },
  { id: '149', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Астана)', region: 'Астана' },
  { id: '151', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Талдыкорган)', region: 'Талдыкорган' },
  { id: '152', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Усть-Каменогорск)', region: 'Усть-Каменогорск' },
  { id: '153', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Уральск)', region: 'Уральск' },
  { id: '154', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Костанай)', region: 'Костанай' },
  { id: '155', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Павлодар)', region: 'Павлодар' },
  { id: '158', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Кызылорда)', region: 'Кызылорда' },
  { id: '159', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Актау)', region: 'Актау' },
  { id: '162', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Актобе)', region: 'Актобе' },
  { id: '1052', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Алматы)', region: 'Алматы' },
  { id: '1075', supplier: 'Аманат', priceDate: '—', name: 'Аманат (Алматы)', region: 'Алматы' },
  { id: '1076', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Астана)', region: 'Астана' },
  { id: '1106', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Актау)', region: 'Актау' },
  { id: '1107', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Шымкент)', region: 'Шымкент' },
  { id: '1108', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Костанай)', region: 'Костанай' },
  { id: '1111', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Павлодар)', region: 'Павлодар' },
  { id: '1114', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Уральск)', region: 'Уральск' },
  { id: '1145', supplier: 'Атамирас', priceDate: '—', name: 'Атамирас (Шымкент)', region: 'Шымкент' },
  { id: '1149', supplier: 'Эмити Интернешнл', priceDate: '—', name: 'Эмити Интернешнл (Петропавловск)', region: 'Петропавловск' },
  { id: '1392', supplier: 'Медсервис', priceDate: '—', name: 'Медсервис (Атырау)', region: 'Атырау' },
  { id: '1397', supplier: 'Зерде ТОО НПО', priceDate: '—', name: 'Зерде ТОО НПО (Алматы)', region: 'Алматы' },
  { id: '8322', supplier: 'Атамирас', priceDate: '—', name: 'Атамирас (Алматы)', region: 'Алматы' },
];

export function CompetitorAssignmentTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLists, setSelectedLists] = useState<SelectedPriceList[]>([
    {
      id: '2',
      coefficient: '1.000',
      supplier: 'Эмити',
      priceDate: '21.03.2026',
      name: 'Персентиль 20',
    },
  ]);

  const filteredLists = mockCompetitorLists.filter((list) =>
    Object.values(list).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDoubleClick = (list: CompetitorPriceList) => {
    const exists = selectedLists.some((item) => item.id === list.id);
    if (!exists) {
      setSelectedLists([
        ...selectedLists,
        {
          id: list.id,
          coefficient: '1.000',
          supplier: list.supplier,
          priceDate: list.priceDate,
          name: list.name,
        },
      ]);
    }
  };

  const handleRemoveSelected = (id: string) => {
    setSelectedLists(selectedLists.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Available Price Lists */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Доступные прайс-листы конкурентов
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Просмотр прайс-листа
          </Button>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Поставщик
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Дата цен
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Наименование
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Регион
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLists.map((list) => (
                  <tr
                    key={list.id}
                    onDoubleClick={() => handleDoubleClick(list)}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {list.supplier}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {list.priceDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {list.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {list.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Двойной клик для добавления в выбранные
        </p>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>

      {/* Selected Price Lists */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Выбранные прайс-листы
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Коэффициент
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Поставщик
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Дата цен
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Наименование
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedLists.map((list) => (
                  <tr
                    key={list.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <Input
                        value={list.coefficient}
                        className="w-24"
                        onChange={() => {}}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {list.supplier}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {list.priceDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {list.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSelected(list.id)}
                      >
                        Удалить
                      </Button>
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
