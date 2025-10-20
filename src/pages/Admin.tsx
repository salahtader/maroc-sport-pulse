import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Users,
  Bell,
  Shield,
  Database,
  Key,
} from "lucide-react";

export default function Admin() {
  return (
    <div className="flex-1 space-y-8 p-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Administration
        </h1>
        <p className="text-muted-foreground">
          Gérez les paramètres, utilisateurs et sécurité de votre système
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Paramètres généraux</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Nom de l'organisation</Label>
                <Input
                  id="org-name"
                  defaultValue="Morocco Sports Analytics"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Input
                  id="timezone"
                  defaultValue="Europe/Paris (GMT+1)"
                  className="bg-background/50"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode maintenance</Label>
                  <div className="text-sm text-muted-foreground">
                    Désactiver temporairement l'accès au système
                  </div>
                </div>
                <Switch />
              </div>

              <Button className="w-full sm:w-auto">
                Enregistrer les modifications
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-semibold">Données & Sauvegarde</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Sauvegarde automatique</div>
                  <div className="text-sm text-muted-foreground">
                    Dernière sauvegarde: Aujourd'hui à 03:00
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Sauvegarder maintenant
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Export des données</div>
                  <div className="text-sm text-muted-foreground">
                    Télécharger toutes vos données
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Exporter
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Gestion des utilisateurs</h3>
            </div>

            <div className="text-muted-foreground">
              Gestion des utilisateurs en cours de développement
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold">Préférences de notifications</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Notifications par email</div>
                  <div className="text-sm text-muted-foreground">
                    Recevoir les alertes importantes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Rapports hebdomadaires</div>
                  <div className="text-sm text-muted-foreground">
                    Résumé des performances chaque lundi
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Alertes de performance</div>
                  <div className="text-sm text-muted-foreground">
                    Notification en cas de baisse significative
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-semibold">Sécurité</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Authentification à deux facteurs</div>
                  <div className="text-sm text-muted-foreground">
                    Sécurité renforcée pour votre compte
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Activer
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Clés API</div>
                  <div className="text-sm text-muted-foreground">
                    Gérer les accès externes
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Key className="h-4 w-4 mr-2" />
                  Gérer
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Journal d'activité</div>
                  <div className="text-sm text-muted-foreground">
                    Consulter l'historique des connexions
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
