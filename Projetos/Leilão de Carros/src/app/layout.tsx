import type { Metadata } from "next";
import "./globals.css";
import { AuctionProvider } from "@/context/AuctionContext";
import { Navbar } from "@/components/Navbar";
import { ToastNotification } from "@/components/ToastNotification";
import { ShieldCheck, Scale, Lock, Bike, BatteryCharging } from "lucide-react";

export const metadata: Metadata = {
  title: "VoltBid Pro • Leilão de Bikes Elétricas & Mobilidade Premium",
  description:
    "Plataforma oficial de leilão de bicicletas elétricas (e-MTBs de alta performance, bikes urbanas e frotas corporativas). Lances ao vivo em tempo real com laudo pericial de saúde de bateria (SoH) e ultrassom de quadro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-dark-950 text-neutral-100 min-h-screen flex flex-col antialiased selection:bg-gold-500 selection:text-dark-950 font-sans">
        <AuctionProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
          <ToastNotification />

          {/* Institutional Commercial Footer */}
          <footer className="mt-20 border-t border-neutral-800 bg-dark-900/90 text-neutral-400 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Overview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-dark-950 font-bold">
                      <Bike className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="font-display font-bold text-lg text-white">
                      VOLT<span className="text-gold-500">BID</span> Pro
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Protótipo de alta fidelidade desenvolvido para apresentação comercial. Pregão eletrônico de bicicletas elétricas com telemetria oficial de baterias, ultrassom pericial de quadros e conformidade legal.
                  </p>
                </div>

                {/* Audit & Legal */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Segurança & Normas Técnicas
                  </h4>
                  <ul className="space-y-1.5 text-neutral-400">
                    <li className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-gold-500" />
                      Decreto Federal nº 21.981/32
                    </li>
                    <li className="flex items-center gap-1.5">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                      Diagnóstico Oficial Bosch / Shimano / Brose
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      Norma ABNT NBR ISO 4210 & CONTRAN 996
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-gold-400" />
                      Pagamento Seguro Direto em Conta Oficial
                    </li>
                  </ul>
                </div>

                {/* Pátios & Visitação */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Pátios de Visitação & Retirada
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    • <strong className="text-neutral-200">Pátio Central:</strong> Barueri/SP (Espaço E-Bike Test)<br />
                    • <strong className="text-neutral-200">Pátio Sul:</strong> Curitiba/PR (Polo Mobilidade)<br />
                    • <strong className="text-neutral-200">Pátio Minas:</strong> Belo Horizonte/MG (Pátio Betim)
                  </p>
                </div>

                {/* Commercial Contact & Demo Control */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Fase Comercial
                  </h4>
                  <p className="text-neutral-400 text-xs">
                    Demonstração interativa desenvolvida para apresentação e fechamento de contrato no mercado de mobilidade elétrica.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-gold-400 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Versão 2.0 • E-Bikes Edition
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
                <div>
                  © 2026 VoltBid Pro • Todos os direitos reservados.
                </div>
                <div className="flex items-center gap-4">
                  <span>Termos do Pregão de E-Bikes</span>
                  <span>•</span>
                  <span>Política de Privacidade</span>
                  <span>•</span>
                  <span>Edital Oficial nº 042/2026</span>
                </div>
              </div>
            </div>
          </footer>
        </AuctionProvider>
      </body>
    </html>
  );
}
