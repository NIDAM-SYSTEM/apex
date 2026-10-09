import { Scale, BookOpen, Users, AlertTriangle, FileText, Shield, Mail, ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const lastUpdated = "17 septembre 2026";

const sections = [
  {
    id: "acceptance",
    icon: "scale",
    title: "Acceptation des conditions",
    colorClass: "text-apex-blue bg-apex-cream border-apex-border-light",
    content: [
      "En accédant à la plateforme APEX ENS Tétouan et en l'utilisant, vous acceptez d'être lié par les présentes Conditions d'utilisation.",
      "Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme. Ces conditions s'appliquent à tous les visiteurs, utilisateurs et membres de la communauté APEX.",
      "APEX se réserve le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme.",
    ],
  },
  {
    id: "access",
    icon: "users",
    title: "Accès à la plateforme",
    colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    content: [
      "La plateforme APEX est principalement destinée aux étudiants, enseignants et membres affiliés à l'École Normale Supérieure de Tétouan.",
      "Vous devez avoir au moins 13 ans pour utiliser nos services. En accédant à la plateforme, vous confirmez que vous remplissez cette condition.",
      "Nous nous réservons le droit de refuser l'accès ou de suspendre tout compte qui violerait ces conditions.",
    ],
  },
  {
    id: "content",
    icon: "book",
    title: "Contenu académique & Ressources",
    colorClass: "text-amber-600 bg-amber-50 border-amber-100",
    content: [
      "Les ressources académiques (cours, TDs, examens, etc.) sont partagées dans un cadre éducatif. Leur utilisation est strictement réservée à des fins d'apprentissage personnel et non commercial.",
      "Les fichiers téléchargés ne peuvent pas être redistribués, vendus ou utilisés à des fins commerciales sans autorisation explicite de leurs auteurs ou de l'ENS Tétouan.",
      "APEX ne garantit pas l'exactitude, la complétude ou l'actualité du contenu académique partagé.",
      "Tout contenu soumis par les utilisateurs doit respecter les droits de propriété intellectuelle.",
    ],
  },
  {
    id: "conduct",
    icon: "shield",
    title: "Code de conduite",
    colorClass: "text-purple-600 bg-purple-50 border-purple-100",
    content: [
      "En utilisant APEX, vous vous engagez à adopter un comportement respectueux envers tous les membres de la communauté.",
      "Il est strictement interdit de publier tout contenu illégal, offensant, discriminatoire, ou portant atteinte à la vie privée d'autrui.",
      "Toute tentative d'interférer avec le fonctionnement de la plateforme ou d'accéder sans autorisation à des données est passible de poursuites légales.",
      "Les comportements abusifs ou le harcèlement entraîneront la suspension immédiate du compte concerné.",
    ],
  },
  {
    id: "liability",
    icon: "alert",
    title: "Limitation de responsabilité",
    colorClass: "text-red-600 bg-red-50 border-red-100",
    content: [
      "APEX est fourni « en l'état » sans garantie d'aucune sorte. Nous ne garantissons pas que la plateforme sera toujours disponible ou exempte d'erreurs.",
      "APEX ne saurait être tenu responsable des pertes de données, des interruptions de service, ou de tout dommage résultant de l'utilisation de la plateforme.",
      "Les liens vers des sites tiers sont fournis à titre informatif uniquement. Nous n'assumons aucune responsabilité quant à leur contenu.",
    ],
  },
  {
    id: "ip",
    icon: "file",
    title: "Propriété intellectuelle",
    colorClass: "text-sky-600 bg-sky-50 border-sky-100",
    content: [
      "La plateforme APEX, son design, son logo, et ses fonctionnalités originales sont la propriété intellectuelle de l'équipe APEX ENS Tétouan.",
      "Vous ne pouvez pas reproduire ou distribuer nos éléments de marque sans autorisation écrite préalable.",
      "Le contenu partagé par les utilisateurs reste la propriété de leurs auteurs. En le partageant sur APEX, vous accordez une licence non exclusive pour l'afficher au sein de la communauté.",
    ],
  },
];

function SectionIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = `w-5 h-5 ${className ?? ""}`;
  if (icon === "scale") return <Scale className={cls} />;
  if (icon === "users") return <Users className={cls} />;
  if (icon === "book") return <BookOpen className={cls} />;
  if (icon === "shield") return <Shield className={cls} />;
  if (icon === "alert") return <AlertTriangle className={cls} />;
  return <FileText className={cls} />;
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-apex-bg flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-[#050B18] overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-apex-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 font-body text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-8">
            <Scale className="w-3.5 h-3.5 text-apex-blue" />
            Cadre légal
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
            Conditions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-blue to-blue-400">
              d&apos;utilisation
            </span>
          </h1>
          <p className="font-body text-[15px] text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
            Ces conditions régissent votre utilisation de la plateforme APEX ENS Tétouan.
            Veuillez les lire attentivement avant d&apos;utiliser nos services.
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
                className="flex-shrink-0 font-body text-[12px] font-medium text-slate-500 hover:text-apex-blue transition-colors duration-150 px-3 py-1.5 rounded-lg hover:bg-apex-cream whitespace-nowrap"
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
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-apex-border-light rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-apex-blue" />
                  <h2 className="font-heading font-bold text-[17px] text-apex-dark">Des questions ?</h2>
                </div>
                <p className="font-body text-[14px] text-slate-600 leading-relaxed mb-4">
                  Si vous avez des questions concernant ces conditions d&apos;utilisation, n&apos;hésitez pas à nous contacter.
                </p>
                <a href="mailto:contact@apex-ens.ma" className="inline-flex items-center gap-2 btn-primary text-sm">
                  Nous contacter
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-apex-border-light shadow-sm p-6 sticky top-24">
                <h2 className="font-heading font-bold text-[15px] text-apex-dark mb-4">Résumé</h2>
                <ul className="space-y-3">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-center gap-2 text-slate-500 hover:text-apex-blue transition-colors duration-150"
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
                  <a href="/privacy" className="font-body text-[13px] font-semibold text-apex-blue hover:underline">
                    Politique de confidentialité →
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
