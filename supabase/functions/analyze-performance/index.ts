import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'player':
        systemPrompt = 'Tu es un analyste sportif professionnel spécialisé dans le football. Analyse les données et fournis des insights détaillés.';
        userPrompt = `Analyse les performances de ce joueur : ${JSON.stringify(data, null, 2)}. 
        Fournis :
        1. Points forts (3-4 points)
        2. Axes d'amélioration (2-3 points)
        3. Évolution récente
        4. Recommandations tactiques`;
        break;

      case 'team_performance':
        systemPrompt = 'Tu es un analyste tactique expert. Évalue l\'état global d\'une équipe.';
        userPrompt = `Analyse globale de l'équipe : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Score de forme actuelle (/10)
        2. Forces principales (3-4 points)
        3. Faiblesses à corriger (2-3 points)
        4. Recommandations prioritaires`;
        break;

      case 'team_style':
        systemPrompt = 'Tu es un analyste tactique spécialisé dans l\'identification de styles de jeu.';
        userPrompt = `Identifie l'ADN tactique de cette équipe : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Profil tactique dominant
        2. Style de pressing et récupération
        3. Construction du jeu
        4. Transitions et verticalité`;
        break;

      case 'opponent_threats':
        systemPrompt = 'Tu es un analyste adversaire expert. Identifie les menaces principales.';
        userPrompt = `Analyse les menaces clés de l'adversaire : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Joueurs dangereux (top 3)
        2. Zones d'attaque privilégiées
        3. Schémas offensifs récurrents
        4. Recommandations défensives`;
        break;

      case 'opponent_weaknesses':
        systemPrompt = 'Tu es un analyste tactique offensif. Identifie les points faibles exploitables.';
        userPrompt = `Analyse les faiblesses de l'adversaire : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Vulnérabilités défensives
        2. Zones exploitables
        3. Moments de faiblesse (transitions, phases arrêtées)
        4. Stratégies offensives recommandées`;
        break;

      case 'lineup_recommendation':
        systemPrompt = 'Tu es un coach analytique. Propose une composition optimale.';
        userPrompt = `Recommande la meilleure composition : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Composition de départ recommandée (11)
        2. Justification des choix
        3. Alternatives tactiques
        4. Remplacements potentiels`;
        break;

      case 'tactical_adjustment':
        systemPrompt = 'Tu es un analyste tactique en temps réel. Propose des ajustements.';
        userPrompt = `Suggère des ajustements tactiques : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Problèmes identifiés
        2. Ajustements recommandés (pressing, largeur, profondeur)
        3. Changements suggérés
        4. Instructions spécifiques`;
        break;

      case 'player_prediction':
        systemPrompt = 'Tu es un analyste prédictif. Estime la performance attendue.';
        userPrompt = `Prédis la performance de ce joueur : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Score de performance attendu (/10)
        2. Probabilité d'impact offensif
        3. Probabilité d'impact défensif
        4. Facteurs clés influençant la performance`;
        break;

      case 'injury_risk':
        systemPrompt = 'Tu es un analyste de prévention physique. Évalue le risque de blessure.';
        userPrompt = `Évalue le risque de blessure : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Score de risque (/10)
        2. Facteurs de risque identifiés
        3. Recommandation de gestion (repos, rotation)
        4. Zones corporelles à surveiller`;
        break;

      case 'performance_regression':
        systemPrompt = 'Tu es un analyste de suivi de performance. Détecte les régressions.';
        userPrompt = `Détecte une régression de performance : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Tendance identifiée (stable/baisse/hausse)
        2. Statistiques en baisse
        3. Causes probables
        4. Plan d'amélioration`;
        break;

      case 'team_strengths_weaknesses':
        systemPrompt = 'Tu es un analyste stratégique d\'équipe. Identifie forces et faiblesses.';
        userPrompt = `Analyse points forts/faibles de l'équipe : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Top 3 forces
        2. Top 3 faiblesses
        3. Zones dominantes
        4. Axes d'amélioration prioritaires`;
        break;

      case 'scouting_profile':
        systemPrompt = 'Tu es un recruteur analyste. Évalue la compatibilité d\'un joueur.';
        userPrompt = `Analyse la compatibilité de ce joueur : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Score de compatibilité (/10)
        2. Adéquation tactique
        3. Points d'intégration
        4. Recommandation (recruter/non)`;
        break;

      case 'match_predictor':
        systemPrompt = 'Tu es un analyste prédictif de match. Calcule les probabilités.';
        userPrompt = `Prédis l'issue du match : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Probabilités (Victoire/Nul/Défaite en %)
        2. Score le plus probable
        3. Facteurs clés
        4. Scénarios possibles`;
        break;

      case 'xg_analysis':
        systemPrompt = 'Tu es un analyste xG (expected goals). Évalue l\'efficacité offensive.';
        userPrompt = `Analyse xG et efficacité : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Ratio xG vs buts réels
        2. Efficacité (sur-performant/sous-performant)
        3. Qualité des occasions
        4. Conseils pour améliorer`;
        break;

      case 'game_plan':
        systemPrompt = 'Tu es un coach tactique. Génère un plan de match complet.';
        userPrompt = `Crée un plan de match : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Stratégie offensive
        2. Organisation défensive
        3. Gestion des transitions
        4. Phases arrêtées et détails tactiques`;
        break;

      case 'post_match_report':
        systemPrompt = 'Tu es un analyste post-match. Génère un rapport complet.';
        userPrompt = `Rapport post-match : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Résumé du match
        2. Statistiques clés
        3. Performances individuelles (top 3)
        4. Axes d'amélioration pour le prochain match`;
        break;

      case 'team':
      case 'match':
      case 'comparison':
        systemPrompt = 'Tu es un analyste sportif professionnel. Analyse les données avec précision.';
        userPrompt = `Analyse : ${JSON.stringify(data, null, 2)}.
        Fournis une analyse détaillée et structurée.`;
        break;

      default:
        throw new Error('Type d\'analyse inconnu');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requêtes atteinte. Réessayez dans quelques instants.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Crédits épuisés. Ajoutez des crédits dans les paramètres.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Erreur lors de l\'analyse IA');
    }

    const result = await response.json();
    const analysis = result.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-performance:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erreur inconnue' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
