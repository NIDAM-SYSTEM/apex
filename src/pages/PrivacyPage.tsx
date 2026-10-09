import { Eye, Lock, Database, Share2, UserCheck, RefreshCw, Mail, ChevronRight, ShieldCheck } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const lastUpdated = "17 septembre 2026";

const sections = [
  {
    id: "collect",
    icon: "database",
    title: "Données collectées",
    colorClass: "text-apex-blue bg-apex-cream border-apex-border-light",
    content: [
      "Nous collectons les informations que vous nous fournissez directement, telles que votre nom, adresse e-mail, filière et semestre lors de la création de votre compte.",
      "Nous collectons automatiquement certaines informations lorsque vous utilisez nos services : données de navigation, adresse IP, type de navigateur, pages visitées et durée des sessions.",
      "Les fichiers que vous téléchargez ou partagez sur la plateforme sont stockés sur nos serveurs dans le cadre du service.",
    ],
  },
  {
    id: "usage",
    icon: "eye",
    title: "Utilisation des données",
    colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    content: [
      "Vos données sont utilisées exclusivement pour fournir, améliorer et personnaliser nos services académiques.",
      "Nous utilisons vos informations pour vous envoyer des notifications pertinentes concernant la plateforme (nouveaux cours, événements, mises à jour importantes).",
      "Les données agrégées et anonymisées peuvent être utilisées à des fins statistiques pour améliorer l'expérience utilisateur globale.",
      "Nous n'utilisons jamais vos données personnelles à des fins publicitaires ou commerciales.",
    ],
  },
  {
    id: "sharing",
    icon: "share",
    title: "Partage des données",
    colorClass: "text-amber-600 bg-amber-50 border-amber-100",
    content: [
      "Nous ne vendons, ne louons et ne partageons pas vos données personnelles avec des tiers à des fins commerciales.",
      "Vos données peuvent être partagées avec des prestataires techniques (hébergement, CDN) uniquement dans la mesure nécessaire au fonctionnement du service.",
      "En cas d'obligation légale ou de procédure judiciaire, nous pouvons être tenus de divulguer certaines informations aux autorités compétentes.",
      "En cas de fusion ou d'acquisition, vos données seraient transférées uniquement si les nouvelles entités s'engagent à respecter cette politique de confidentialité.",
    ],
  },
  {
    id: "security",
    icon: "lock",
    title: "Sécurité des données",
    colorClass: "text-purple-600 bg-purple-50 border-purple-100",
    content: [
      "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.",
      "Les connexions à la plateforme sont chiffrées via le protocole HTTPS (TLS).",
      "L'accès à vos données personnelles est strictement limité aux membres de l'équipe APEX ayant besoin d'y accéder dans le cadre de leurs fonctions.",
      "En cas de violation de données susceptible de vous affecter, nous vous en informerons dans les meilleurs délais conformément à la réglementation applicable.",
    ],
  },
  {
    id: "rights",
    icon: "usercheck",
    title: "Vos droits",
    colorClass: "text-sky-600 bg-sky-50 border-sky-100",
    content: [
      "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ces droits en nous contactant directement.",
      "Vous avez le droit de vous opposer au traitement de vos données ou d'en demander la limitation dans certaines circonstances.",
      "Vous pouvez demander la portabilité de vos données dans un format structuré et lisible par machine.",
      "Vous avez le droit de retirer votre consentement à tout moment, sans que cela n'affecte la licéité du traitement effectué avant ce retrait.",
    ],
  },
  {
    id: "cookies",
    icon: "refresh",
    title: "Cookies & Technologies similaires",
    colorClass: "text-rose-600 bg-rose-50 border-rose-100",
    content: [
      "Nous utilisons des cookies essentiels pour assurer le bon fonctionnement de la plateforme (authentification, préférences utilisateur).",
      "Des cookies analytiques anonymes peuvent être utilisés pour comprendre comment la plateforme est utilisée et l'améliorer en conséquence.",
      "Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités de la plateforme pourraient alors être limitées.",
      "Nous ne déposons aucun cookie publicitaire ou de traçage tiers.",
    ],
  },
];

function SectionIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = `w-5 h-5 ${className ?? ""}`;
  if (icon === "database") return <Database className={cls} />;
  if (icon === "eye") return <Eye className={cls} />;
  if (icon === "share") return <Share2 className={cls} />;
  if (icon === "lock") return <Lock className={cls} />;
  if (icon === "usercheck") return <UserCheck className={cls} />;
  return <RefreshCw className={cls} />;
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-apex-bg flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-[#050B18] overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-apex-blue/8 rounded-full blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 font-body text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Protection des données
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
            Politique de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              confidentialité
            </span>
          </h1>
          <p className="font-body text-[15px] text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
            Votre vie privée est notre priorité. Découvrez comment nous collectons, utilisons
            et protégeons vos données personnelles sur la plateforme APEX.
          </p>
          <p className="font-body text-[13px] text-slate-500 font-medium">
            Dernière mise à jour : {lastUpdated}
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="bg-white border-b border-apex-border-light sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto py-3" aria-label="Sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 font-body text-[12px] font-medium text-slate-500 hover:text-emerald-600 transition-colors duration-150 px-3 py-1.5 rounded-lg hover:bg-emerald-50 whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Articles */}
            <div className="lg:col-span-8 space-y-8">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 bg-white rounded-2xl border border-apex-border-light shadow-sm p-7 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`p-2.5 rounded-xl border ${section.colorClass} flex-shrink-0`}>
                      <SectionIcon icon={section.icon} />
                    </div>
                    <h2 className="font-heading font-bold text-[18px] text-apex-dark leading-tight pt-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3.5 pl-14">
                    {section.content.map((para, i) => (
                      <p key={i} className="font-body text-[14px] text-slate-600 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              ))}

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-heading font-bold text-[17px] text-apex-dark">
                    Exercer vos droits
                  </h2>
                </div>
                <p className="font-body text-[14px] text-slate-600 leading-relaxed mb-4">
                  Pour toute demande concernant vos données personnelles (accès, rectification, suppression),
                  contactez-nous directement. Nous répondrons dans un délai de 30 jours.
                </p>
                <a href="mailto:contact@apex-ens.ma" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-body font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]">
                  Contacter la DPO
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-apex-border-light shadow-sm p-6 sticky top-24">
                {/* Trust badge */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-apex-border-light">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-[13px] text-apex-dark">Données protégées</p>
                    <p className="font-body text-[11px] text-slate-400">Chiffrées & sécurisées</p>
                  </div>
                </div>
                <h2 className="font-heading font-bold text-[15px] text-apex-dark mb-4">Résumé</h2>
                <ul className="space-y-3">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors duration-150"
                      >
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-150" />
                        <span className="font-body text-[13px] font-medium">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-apex-border-light mt-6 pt-5">
                  <p className="font-body text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-2">
                    Également disponible
                  </p>
                  <a href="/terms" className="font-body text-[13px] font-semibold text-apex-blue hover:underline">
                    Conditions d&apos;utilisation →
                  </a>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
