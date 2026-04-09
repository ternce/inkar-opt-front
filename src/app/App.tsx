import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { PriceListsTab } from './components/PriceListsTab';
import { CompetitorAssignmentTab } from './components/CompetitorAssignmentTab';
import { ListsManagementTab } from './components/ListsManagementTab';
import { ContractorsTab } from './components/ContractorsTab';
import { PricingSettingsTab } from './components/PricingSettingsTab';
import { UniversalListsTab } from './components/UniversalListsTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { Button } from './components/ui/button';

interface PriceFormat {
  id: string;
  name: string;
  code: string;
  branch: string;
}

export default function App() {
  const [priceFormats, setPriceFormats] = useState<PriceFormat[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<PriceFormat | null>(null);
  const [activeTab, setActiveTab] = useState<string>('pricelists');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadPriceFormats = async (selectCode?: string) => {
    const res = await fetch('/api/price-formats');
    const text = await res.text();
    const data = text ? JSON.parse(text) : [];
    if (Array.isArray(data)) {
      const items: PriceFormat[] = data.map((x: any) => ({
        id: String(x.code ?? ''),
        name: String(x.name ?? ''),
        code: String(x.code ?? ''),
        branch: String(x.branch ?? ''),
      }));
      setPriceFormats(items);
      setSelectedFormat((prev) => {
        const desired = (selectCode || prev?.code || '').trim();
        const next = desired ? items.find((x) => x.code === desired) : null;
        return next ?? items[0] ?? null;
      });
    }
  };

  useEffect(() => {
    void loadPriceFormats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedFormat) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Управление прайс-листами и ценообразованием</h1>
        </header>

        <main className="p-6">
          <div className="text-sm text-gray-700 mb-4">Нет ценовых форматов. Создайте новый через загрузку Excel.</div>
          <PriceListsTab onPriceFormatsChanged={(code) => loadPriceFormats(code)} formatCode="" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-900">Управление прайс-листами и ценообразованием</h1>
        <Button variant="outline" size="sm" type="button" onClick={() => setSidebarOpen((v) => !v)}>
          {sidebarOpen ? 'Скрыть панель' : 'Показать панель'}
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel */}
        {sidebarOpen ? (
        <aside className="w-80 bg-white border-r border-gray-200 overflow-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Ценовые форматы
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Наименование
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Код
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Филиал
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceFormats.map((format) => (
                    <tr
                      key={format.id}
                      onClick={() => setSelectedFormat(format)}
                      className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedFormat.id === format.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {format.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {format.code}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {format.branch}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 text-gray-900">Навигация</h3>
              <div className="space-y-1">
                {[
                  { key: 'pricelists', label: 'Сформированные прайс-листы' },
                  { key: 'competitors', label: 'Назначение прайс-листов конкурентов' },
                  { key: 'lists', label: 'Работа со списками' },
                  { key: 'contractors', label: 'Контрагенты' },
                  { key: 'pricing', label: 'Настройки ценообразования' },
                  { key: 'universal', label: 'Универсальные списки' },
                  { key: 'analytics', label: 'Аналитика прайс-листа' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm border transition-colors ${
                      activeTab === item.key
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
        ) : null}

        {/* Right Panel */}
        <main className="flex-1 bg-white overflow-auto">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedFormat.name} — {selectedFormat.branch}
              </h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b border-gray-200 rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="pricelists"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Сформированные прайс-листы
                </TabsTrigger>
                <TabsTrigger
                  value="competitors"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Назначение прайс-листов конкурентов
                </TabsTrigger>
                <TabsTrigger
                  value="lists"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Работа со списками
                </TabsTrigger>
                <TabsTrigger
                  value="contractors"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Контрагенты
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Настройки ценообразования
                </TabsTrigger>
                <TabsTrigger
                  value="universal"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Универсальные списки
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Аналитика прайс-листа
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="pricelists" className="m-0">
                  <PriceListsTab
                    formatCode={selectedFormat.code}
                    onPriceFormatsChanged={(code) => loadPriceFormats(code)}
                  />
                </TabsContent>
                <TabsContent value="competitors" className="m-0">
                  <CompetitorAssignmentTab />
                </TabsContent>
                <TabsContent value="lists" className="m-0">
                  <ListsManagementTab />
                </TabsContent>
                <TabsContent value="contractors" className="m-0">
                  <ContractorsTab />
                </TabsContent>
                <TabsContent value="pricing" className="m-0">
                  <PricingSettingsTab
                    formatCode={selectedFormat.code}
                    onSaved={() => loadPriceFormats(selectedFormat.code)}
                  />
                </TabsContent>
                <TabsContent value="universal" className="m-0">
                  <UniversalListsTab />
                </TabsContent>
                <TabsContent value="analytics" className="m-0">
                  <AnalyticsTab formatCode={selectedFormat.code} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
