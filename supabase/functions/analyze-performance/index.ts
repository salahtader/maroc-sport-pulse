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
        systemPrompt = 'Tu es un analyste sportif professionnel spécialisé dans le football marocain. Analyse les données et fournis des insights détaillés.';
        userPrompt = `Analyse les performances de ce joueur : ${JSON.stringify(data, null, 2)}. 
        Fournis :
        1. Points forts (3-4 points)
        2. Axes d'amélioration (2-3 points)
        3. Évolution récente
        4. Recommandations tactiques`;
        break;

      case 'team':
        systemPrompt = 'Tu es un analyste tactique expert en football. Analyse les performances collectives avec précision.';
        userPrompt = `Analyse les performances de l'équipe : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Analyse tactique globale
        2. Tendances statistiques clés
        3. Comparaison avec les objectifs
        4. Recommandations stratégiques`;
        break;

      case 'match':
        systemPrompt = 'Tu es un analyste de match professionnel. Fournis une analyse post-match détaillée.';
        userPrompt = `Analyse ce match : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Moments clés du match
        2. Performances individuelles marquantes
        3. Analyse tactique
        4. Points d'amélioration`;
        break;

      case 'comparison':
        systemPrompt = 'Tu es un analyste comparatif spécialisé. Compare objectivement les performances.';
        userPrompt = `Compare ces joueurs/équipes : ${JSON.stringify(data, null, 2)}.
        Fournis :
        1. Comparaison détaillée des statistiques
        2. Profils de jeu différents
        3. Avantages de chacun
        4. Recommandations d'utilisation`;
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
