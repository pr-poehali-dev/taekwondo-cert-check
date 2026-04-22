import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "about" | "athletes" | "certificates" | "documents" | "contacts";

const ATHLETES = [
  { id: 1, name: "Алексей Громов", rank: "1 дан", region: "Москва", weight: "80 кг", medals: 12, rating: 98, certDate: "2024-03-15", certNum: "ATF-2024-001" },
  { id: 2, name: "Мария Соколова", rank: "2 дан", region: "СПб", weight: "57 кг", medals: 18, rating: 96, certDate: "2023-11-20", certNum: "ATF-2023-087" },
  { id: 3, name: "Дмитрий Волков", rank: "3 дан", region: "Казань", weight: "74 кг", medals: 24, rating: 94, certDate: "2024-01-10", certNum: "ATF-2024-002" },
  { id: 4, name: "Анна Белова", rank: "1 дан", region: "Новосибирск", weight: "49 кг", medals: 8, rating: 88, certDate: "2024-05-22", certNum: "ATF-2024-019" },
  { id: 5, name: "Сергей Крылов", rank: "4 дан", region: "Екатеринбург", weight: "87 кг", medals: 31, rating: 99, certDate: "2022-09-05", certNum: "ATF-2022-044" },
  { id: 6, name: "Елена Захарова", rank: "2 дан", region: "Краснодар", weight: "53 кг", medals: 15, rating: 91, certDate: "2023-07-18", certNum: "ATF-2023-061" },
  { id: 7, name: "Павел Орлов", rank: "1 дан", region: "Ростов", weight: "63 кг", medals: 6, rating: 82, certDate: "2024-08-30", certNum: "ATF-2024-033" },
  { id: 8, name: "Наталья Козлова", rank: "3 дан", region: "Самара", weight: "67 кг", medals: 22, rating: 93, certDate: "2023-02-14", certNum: "ATF-2023-012" },
];

const DOCUMENTS = [
  { id: 1, title: "Устав ATF", type: "PDF", size: "2.3 МБ", date: "2024-01-15", category: "Организационные" },
  { id: 2, title: "Регламент соревнований 2024", type: "PDF", size: "5.1 МБ", date: "2024-02-01", category: "Соревнования" },
  { id: 3, title: "Правила аттестации", type: "PDF", size: "1.8 МБ", date: "2024-01-20", category: "Аттестация" },
  { id: 4, title: "Форма заявки участника", type: "DOCX", size: "0.5 МБ", date: "2024-03-05", category: "Формы" },
  { id: 5, title: "Квалификационные требования", type: "PDF", size: "3.2 МБ", date: "2023-12-10", category: "Аттестация" },
  { id: 6, title: "Протокол ЧФ 2024", type: "PDF", size: "1.1 МБ", date: "2024-04-15", category: "Соревнования" },
];

const RANK_COLORS: Record<string, string> = {
  "1 дан": "bg-gray-700 text-white",
  "2 дан": "bg-blue-900 text-blue-200",
  "3 дан": "bg-red-900 text-red-200",
  "4 дан": "bg-amber-900 text-amber-200",
  "5 дан": "bg-purple-900 text-purple-200",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [athleteSearch, setAthleteSearch] = useState("");
  const [athleteFilter, setAthleteFilter] = useState("all");
  const [certSearch, setCertSearch] = useState("");
  const [certResult, setCertResult] = useState<typeof ATHLETES[0] | null | "not_found">(null);
  const [certSearched, setCertSearched] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredAthletes = ATHLETES.filter(a => {
    const searchLower = athleteSearch.toLowerCase();
    const matchSearch = !athleteSearch ||
      a.name.toLowerCase().includes(searchLower) ||
      a.region.toLowerCase().includes(searchLower) ||
      a.rank.toLowerCase().includes(searchLower);
    const matchFilter = athleteFilter === "all" || athleteFilter === "rating" || a.rank === athleteFilter;
    return matchSearch && matchFilter;
  }).sort((a, b) => b.rating - a.rating);

  const handleCertCheck = () => {
    if (!certSearch.trim()) return;
    setCertSearched(true);
    const found = ATHLETES.find(a =>
      a.certNum.toLowerCase().includes(certSearch.toLowerCase()) ||
      a.name.toLowerCase().includes(certSearch.toLowerCase())
    );
    setCertResult(found || "not_found");
  };

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О федерации" },
    { id: "athletes", label: "Спортсмены" },
    { id: "certificates", label: "Сертификаты" },
    { id: "documents", label: "Документы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-atf-dark text-atf-text font-roboto">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setActiveSection("home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-atf-red flex items-center justify-center font-oswald font-bold text-white text-sm">
                ATF
              </div>
              <div className="hidden sm:block">
                <div className="font-oswald font-bold text-white text-sm tracking-widest uppercase">Тэквондо ATF</div>
                <div className="text-[10px] text-gray-400 tracking-wider uppercase">Федерация всестилевого тэквондо</div>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`nav-link text-sm pb-1 ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSection("certificates")}
                className="hidden sm:flex btn-atf px-4 py-2 text-xs rounded items-center gap-2"
              >
                <Icon name="ShieldCheck" size={14} />
                Проверить сертификат
              </button>
              <button className="lg:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
                <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-black border-t border-white/10 px-4 py-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenu(false); }}
                className={`block w-full text-left py-3 font-oswald uppercase tracking-wider text-sm border-b border-white/5 ${activeSection === item.id ? "text-atf-red" : "text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ======= ГЛАВНАЯ ======= */}
      {activeSection === "home" && (
        <div>
          <section className="relative min-h-screen flex items-center hero-pattern pt-16 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://cdn.poehali.dev/projects/876833fa-3613-4e39-a48e-2229c9bc6219/files/95f20c1e-16fd-4f01-8803-62196c201cbc.jpg"
                alt="Тэквон-до"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full diagonal-stripe hidden lg:block opacity-20" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atf-red to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6 animate-fade-in">
                  <div className="w-8 h-0.5 bg-atf-red" />
                  <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">Федерация всестилевого тэквондо</span>
                </div>
                <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-slide-up">
                  СИЛА.<br />
                  ЧЕСТЬ.<br />
                  <span className="text-atf-red animate-glow">ДУХ.</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Официальная федерация всестилевого тэквондо ATF. Объединяем спортсменов всех стилей и направлений, развиваем боевое искусство, сохраняем традиции.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveSection("certificates")}
                    className="btn-atf px-6 py-3 text-sm rounded flex items-center gap-2"
                  >
                    <Icon name="ShieldCheck" size={16} />
                    Проверить сертификат
                  </button>
                  <button
                    onClick={() => setActiveSection("athletes")}
                    className="px-6 py-3 text-sm rounded border border-white/30 text-white font-oswald uppercase tracking-wider hover:border-atf-red hover:text-atf-red transition-colors flex items-center gap-2"
                  >
                    <Icon name="Users" size={16} />
                    База спортсменов
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { num: "2 400+", label: "Спортсменов" },
                    { num: "48", label: "Регионов" },
                    { num: "15", label: "Лет опыта" },
                    { num: "320+", label: "Чемпионов" },
                  ].map(stat => (
                    <div key={stat.label} className="text-center bg-black/50 backdrop-blur rounded px-4 py-3 border border-white/10">
                      <div className="font-oswald text-2xl font-bold text-atf-red">{stat.num}</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider font-oswald">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-atf-gray py-10 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    className="input-atf w-full pl-10 pr-4 py-3 rounded text-sm"
                    placeholder="Найти спортсмена или сертификат..."
                    value={certSearch}
                    onChange={e => setCertSearch(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (setActiveSection("certificates"), handleCertCheck())}
                  />
                </div>
                <button
                  onClick={() => { setActiveSection("certificates"); handleCertCheck(); }}
                  className="btn-atf px-6 py-3 text-sm rounded whitespace-nowrap"
                >
                  Быстрый поиск
                </button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-atf-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="section-title text-3xl text-white mb-12 text-center">
                Возможности <span className="text-atf-red">платформы</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "ShieldCheck", title: "Проверка сертификатов", desc: "Мгновенная проверка подлинности любого сертификата федерации онлайн", action: "certificates" },
                  { icon: "Users", title: "База спортсменов", desc: "Полная база данных с рейтингами, регионами и достижениями", action: "athletes" },
                  { icon: "FileText", title: "Документы", desc: "Уставы, регламенты, формы заявок и официальные протоколы", action: "documents" },
                ].map(f => (
                  <button
                    key={f.title}
                    onClick={() => setActiveSection(f.action as Section)}
                    className="card-hover bg-atf-gray border border-white/10 rounded-lg p-6 text-left group"
                  >
                    <div className="w-12 h-12 bg-atf-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-atf-red/20 transition-colors">
                      <Icon name={f.icon} size={24} className="text-atf-red" />
                    </div>
                    <h3 className="font-oswald text-lg text-white mb-2 uppercase">{f.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    <div className="flex items-center gap-2 mt-4 text-atf-red text-sm font-oswald">
                      Перейти <Icon name="ArrowRight" size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-atf-gray border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="section-title text-2xl text-white">
                  ТОП <span className="text-atf-red">Спортсменов</span>
                </h2>
                <button onClick={() => setActiveSection("athletes")} className="text-atf-red font-oswald text-sm uppercase tracking-wider hover:underline flex items-center gap-1">
                  Все <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...ATHLETES].sort((a, b) => b.rating - a.rating).slice(0, 4).map((a, i) => (
                  <div key={a.id} className="bg-atf-dark border border-white/10 rounded-lg p-4 card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`rank-badge ${i === 0 ? "bg-amber-500 text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-atf-gray text-gray-300"}`}>
                        #{i + 1}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-oswald ${RANK_COLORS[a.rank] || "bg-gray-700 text-white"}`}>
                        {a.rank}
                      </span>
                    </div>
                    <div className="font-montserrat font-semibold text-white text-sm mb-1">{a.name}</div>
                    <div className="text-gray-400 text-xs mb-2">{a.region} · {a.weight}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black rounded-full h-1.5">
                        <div className="bg-atf-red h-1.5 rounded-full" style={{ width: `${a.rating}%` }} />
                      </div>
                      <span className="text-atf-red text-xs font-oswald">{a.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ======= О ФЕДЕРАЦИИ ======= */}
      {activeSection === "about" && (
        <div className="pt-16">
          <div className="relative bg-atf-gray py-20 clip-diagonal">
            <div className="absolute inset-0 diagonal-stripe opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-atf-red" />
                <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">ATF</span>
              </div>
              <h1 className="section-title text-4xl sm:text-5xl text-white mb-4">О ФЕДЕРАЦИИ</h1>
              <p className="text-gray-400 text-lg max-w-2xl">ATF — официальная федерация всестилевого тэквондо, объединяющая клубы и спортсменов всех направлений по всей стране</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="section-title text-2xl text-white mb-6">Наша миссия</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Федерация всестилевого тэквондо ATF объединяет спортсменов и клубы всех стилей и направлений тэквондо на территории России и стран СНГ.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Мы обеспечиваем прозрачную систему аттестации для всех стилей, проводим открытые соревнования, поддерживаем международные связи и способствуем развитию каждого спортсмена.
                </p>
                <div className="space-y-3">
                  {["Официальная аттестация и выдача сертификатов", "Проведение соревнований всех уровней", "Международное сотрудничество с ITF", "Поддержка молодёжного спорта"].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-atf-red rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={10} className="text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "2009", label: "Год основания" },
                  { num: "48", label: "Регионов" },
                  { num: "150+", label: "Клубов-партнёров" },
                  { num: "2400+", label: "Спортсменов" },
                ].map(s => (
                  <div key={s.label} className="bg-atf-gray rounded-lg p-6 border border-white/10 text-center">
                    <div className="font-oswald text-3xl text-atf-red font-bold mb-2">{s.num}</div>
                    <div className="text-gray-400 text-sm font-oswald uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="section-title text-2xl text-white mb-8">Руководство</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { name: "Александр Петров", role: "Президент федерации", dan: "7 дан" },
                { name: "Ирина Новикова", role: "Генеральный секретарь", dan: "5 дан" },
                { name: "Михаил Зайцев", role: "Технический директор", dan: "6 дан" },
              ].map(p => (
                <div key={p.name} className="bg-atf-gray rounded-lg p-6 border border-white/10 card-hover">
                  <div className="w-16 h-16 bg-atf-red/10 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-atf-red/30">
                    <Icon name="User" size={28} className="text-atf-red" />
                  </div>
                  <div className="text-center">
                    <div className="font-montserrat font-bold text-white mb-1">{p.name}</div>
                    <div className="text-gray-400 text-sm mb-2">{p.role}</div>
                    <span className="bg-atf-red/20 text-atf-red text-xs px-3 py-1 rounded-full font-oswald">{p.dan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======= СПОРТСМЕНЫ ======= */}
      {activeSection === "athletes" && (
        <div className="pt-16">
          <div className="relative bg-atf-gray py-16 clip-diagonal">
            <div className="absolute inset-0 diagonal-stripe opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-atf-red" />
                <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">База данных</span>
              </div>
              <h1 className="section-title text-4xl sm:text-5xl text-white mb-4">СПОРТСМЕНЫ</h1>
              <p className="text-gray-400">Реестр аттестованных спортсменов ATF</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="input-atf w-full pl-10 pr-4 py-3 rounded text-sm"
                  placeholder="Поиск по имени, региону или дану..."
                  value={athleteSearch}
                  onChange={e => setAthleteSearch(e.target.value)}
                />
              </div>
              <select
                className="input-atf px-4 py-3 rounded text-sm cursor-pointer"
                value={athleteFilter}
                onChange={e => setAthleteFilter(e.target.value)}
              >
                <option value="all">Все даны</option>
                <option value="1 дан">1 дан</option>
                <option value="2 дан">2 дан</option>
                <option value="3 дан">3 дан</option>
                <option value="4 дан">4 дан</option>
              </select>
              <button
                onClick={() => setAthleteFilter("rating")}
                className={`px-4 py-3 rounded text-sm font-oswald uppercase tracking-wider border transition-colors flex items-center gap-2 ${athleteFilter === "rating" ? "bg-atf-red border-atf-red text-white" : "border-white/20 text-gray-300 hover:border-atf-red hover:text-atf-red"}`}
              >
                <Icon name="TrendingUp" size={14} />
                По рейтингу
              </button>
            </div>

            <div className="text-gray-400 text-sm mb-4 font-oswald">
              Найдено: <span className="text-atf-red font-bold">{filteredAthletes.length}</span> спортсменов
            </div>

            <div className="bg-atf-gray rounded-lg border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/30">
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider">Спортсмен</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider hidden sm:table-cell">Регион</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider">Дан</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider hidden md:table-cell">Медали</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider">Рейтинг</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-xs font-oswald uppercase tracking-wider hidden lg:table-cell">Сертификат</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAthletes.map((a, idx) => (
                      <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 text-gray-500 text-sm">{idx + 1}</td>
                        <td className="px-4 py-4">
                          <div className="font-montserrat font-semibold text-white text-sm">{a.name}</div>
                          <div className="text-gray-500 text-xs">{a.weight}</div>
                        </td>
                        <td className="px-4 py-4 text-gray-300 text-sm hidden sm:table-cell">{a.region}</td>
                        <td className="px-4 py-4">
                          <span className={`text-xs px-2 py-1 rounded font-oswald ${RANK_COLORS[a.rank] || "bg-gray-700 text-white"}`}>
                            {a.rank}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-300 text-sm hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Icon name="Medal" size={12} className="text-amber-400" />
                            {a.medals}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-black rounded-full h-1.5">
                              <div className="bg-atf-red h-1.5 rounded-full" style={{ width: `${a.rating}%` }} />
                            </div>
                            <span className="text-atf-red text-xs font-oswald font-bold">{a.rating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-400 text-xs font-mono hidden lg:table-cell">{a.certNum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAthletes.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Icon name="Search" size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="font-oswald uppercase tracking-wider">Спортсмены не найдены</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======= СЕРТИФИКАТЫ ======= */}
      {activeSection === "certificates" && (
        <div className="pt-16">
          <div className="relative bg-atf-gray py-16 clip-diagonal">
            <div className="absolute inset-0 diagonal-stripe opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-atf-red" />
                <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">Верификация</span>
              </div>
              <h1 className="section-title text-4xl sm:text-5xl text-white mb-4">ПРОВЕРКА СЕРТИФИКАТОВ</h1>
              <p className="text-gray-400">Введите номер сертификата или имя спортсмена</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="bg-atf-gray rounded-xl border border-white/10 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-atf-red/10 rounded-lg flex items-center justify-center">
                  <Icon name="ShieldCheck" size={24} className="text-atf-red" />
                </div>
                <div>
                  <h2 className="font-oswald text-lg text-white uppercase">Поиск сертификата</h2>
                  <p className="text-gray-400 text-sm">По номеру или имени спортсмена</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    className="input-atf w-full pl-10 pr-4 py-4 rounded text-sm"
                    placeholder="ATF-2024-001 или Иванов Иван..."
                    value={certSearch}
                    onChange={e => { setCertSearch(e.target.value); setCertSearched(false); }}
                    onKeyDown={e => e.key === "Enter" && handleCertCheck()}
                  />
                </div>
                <button onClick={handleCertCheck} className="btn-atf px-6 py-4 rounded text-sm">
                  Проверить
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-gray-500 text-xs">Примеры:</span>
                {["ATF-2024-001", "ATF-2023-087", "Громов"].map(ex => (
                  <button
                    key={ex}
                    onClick={() => { setCertSearch(ex); setCertSearched(false); }}
                    className="text-atf-red text-xs hover:underline font-mono bg-atf-red/10 px-2 py-0.5 rounded"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {certSearched && certResult === "not_found" && (
              <div className="bg-red-950/50 border border-red-800/50 rounded-xl p-8 text-center animate-fade-in">
                <Icon name="XCircle" size={40} className="text-red-400 mx-auto mb-4" />
                <h3 className="font-oswald text-lg text-white uppercase mb-2">Сертификат не найден</h3>
                <p className="text-gray-400 text-sm">Проверьте правильность данных или обратитесь в федерацию</p>
              </div>
            )}

            {certSearched && certResult && certResult !== "not_found" && (
              <div className="bg-green-950/50 border border-green-700/50 rounded-xl p-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={28} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-lg text-white uppercase">Сертификат подтверждён</h3>
                    <p className="text-green-400 text-sm">Документ является подлинным</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Спортсмен", value: certResult.name },
                    { label: "Номер сертификата", value: certResult.certNum },
                    { label: "Квалификация", value: certResult.rank },
                    { label: "Регион", value: certResult.region },
                    { label: "Дата выдачи", value: new Date(certResult.certDate).toLocaleDateString("ru-RU") },
                    { label: "Весовая категория", value: certResult.weight },
                  ].map(field => (
                    <div key={field.label} className="bg-black/30 rounded-lg p-4">
                      <div className="text-gray-400 text-xs font-oswald uppercase tracking-wider mb-1">{field.label}</div>
                      <div className="text-white font-montserrat font-semibold">{field.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-green-700/30 flex items-center gap-2 text-green-400 text-xs">
                  <Icon name="Shield" size={12} />
                  Верифицировано системой ATF · {new Date().toLocaleDateString("ru-RU")}
                </div>
              </div>
            )}

            {!certSearched && (
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "Clock", title: "Мгновенно", desc: "Результат за секунды" },
                  { icon: "Database", title: "Актуальная база", desc: "Данные обновляются в реальном времени" },
                  { icon: "Lock", title: "Официально", desc: "Только реестр ATF" },
                ].map(f => (
                  <div key={f.title} className="bg-atf-gray rounded-lg p-4 border border-white/10 text-center">
                    <Icon name={f.icon} size={24} className="text-atf-red mx-auto mb-2" />
                    <div className="font-oswald text-white uppercase text-sm mb-1">{f.title}</div>
                    <div className="text-gray-400 text-xs">{f.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======= ДОКУМЕНТЫ ======= */}
      {activeSection === "documents" && (
        <div className="pt-16">
          <div className="relative bg-atf-gray py-16 clip-diagonal">
            <div className="absolute inset-0 diagonal-stripe opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-atf-red" />
                <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">Библиотека</span>
              </div>
              <h1 className="section-title text-4xl sm:text-5xl text-white mb-4">ДОКУМЕНТЫ</h1>
              <p className="text-gray-400">Официальные документы, регламенты и формы ATF</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENTS.map(doc => (
                <div key={doc.id} className="bg-atf-gray rounded-lg border border-white/10 p-5 card-hover group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-14 bg-atf-dark rounded flex flex-col items-center justify-center border border-white/10 flex-shrink-0">
                      <Icon name="FileText" size={18} className="text-atf-red mb-1" />
                      <span className="text-[9px] text-gray-500 font-oswald">{doc.type}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-montserrat font-semibold text-white text-sm mb-1 group-hover:text-atf-red transition-colors">{doc.title}</h3>
                      <div className="text-atf-red/70 text-xs mb-2 font-oswald">{doc.category}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>{doc.size}</span>
                        <span>·</span>
                        <span>{new Date(doc.date).toLocaleDateString("ru-RU")}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full border border-white/20 hover:border-atf-red hover:text-atf-red text-gray-300 rounded py-2 text-xs font-oswald uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    <Icon name="Download" size={12} />
                    Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======= КОНТАКТЫ ======= */}
      {activeSection === "contacts" && (
        <div className="pt-16">
          <div className="relative bg-atf-gray py-16 clip-diagonal">
            <div className="absolute inset-0 diagonal-stripe opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-atf-red" />
                <span className="text-atf-red font-oswald text-sm tracking-widest uppercase">ATF</span>
              </div>
              <h1 className="section-title text-4xl sm:text-5xl text-white mb-4">КОНТАКТЫ</h1>
              <p className="text-gray-400">Свяжитесь с нами по любым вопросам</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="section-title text-2xl text-white mb-8">Реквизиты федерации</h2>
                <div className="space-y-4">
                  {[
                    { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Спортивная, 12, офис 305" },
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                    { icon: "Mail", label: "Email", value: "info@atf-tkd.ru" },
                    { icon: "Globe", label: "Сайт", value: "www.atf-tkd.ru" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00" },
                  ].map(c => (
                    <div key={c.label} className="flex items-start gap-4 bg-atf-gray rounded-lg p-4 border border-white/10">
                      <div className="w-10 h-10 bg-atf-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={18} className="text-atf-red" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs font-oswald uppercase tracking-wider mb-1">{c.label}</div>
                        <div className="text-white text-sm">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-title text-2xl text-white mb-8">Написать нам</h2>
                <div className="bg-atf-gray rounded-xl border border-white/10 p-6 space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs font-oswald uppercase tracking-wider block mb-2">Ваше имя</label>
                    <input className="input-atf w-full px-4 py-3 rounded text-sm" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-oswald uppercase tracking-wider block mb-2">Email</label>
                    <input className="input-atf w-full px-4 py-3 rounded text-sm" placeholder="ivan@example.com" type="email" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-oswald uppercase tracking-wider block mb-2">Тема</label>
                    <select className="input-atf w-full px-4 py-3 rounded text-sm cursor-pointer">
                      <option>Вопрос по сертификату</option>
                      <option>Вступление в федерацию</option>
                      <option>Соревнования</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-oswald uppercase tracking-wider block mb-2">Сообщение</label>
                    <textarea className="input-atf w-full px-4 py-3 rounded text-sm resize-none" rows={4} placeholder="Опишите ваш вопрос..." />
                  </div>
                  <button className="btn-atf w-full py-3 rounded text-sm flex items-center justify-center gap-2">
                    <Icon name="Send" size={14} />
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-atf-red flex items-center justify-center font-oswald font-bold text-white text-sm">ATF</div>
              <div>
                <div className="font-oswald text-white text-sm tracking-widest uppercase">Тэквон-до ATF</div>
                <div className="text-gray-500 text-xs">Федерация всестилевого тэквондо</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {navItems.map(n => (
                <button key={n.id} onClick={() => setActiveSection(n.id)} className="text-gray-400 hover:text-atf-red text-xs font-oswald uppercase tracking-wider transition-colors">
                  {n.label}
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-xs">© 2024 ATF. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}