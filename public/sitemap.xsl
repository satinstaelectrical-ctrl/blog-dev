<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
      <head>
        <title>Sitemap XML Éditorial — ONTARIO Magazine</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #071426;
            color: #F2F7FF;
            padding: 40px 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #0E2137 0%, #122B45 100%);
            border: 1px solid #28445E;
            border-radius: 20px;
            padding: 32px;
            margin-bottom: 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .logo-badge {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #EF4248;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 20px;
            box-shadow: 0 8px 20px rgba(239, 66, 72, 0.4);
          }
          .brand h1 {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #FFFFFF;
          }
          .brand p {
            font-size: 13px;
            color: #839BB5;
          }
          .badge-sitemap {
            display: inline-block;
            background: rgba(239, 66, 72, 0.15);
            color: #EF4248;
            border: 1px solid rgba(239, 66, 72, 0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .btn-home {
            background-color: #EF4248;
            color: #FFFFFF;
            text-decoration: none;
            padding: 10px 22px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 14px rgba(239, 66, 72, 0.35);
          }
          .btn-home:hover {
            background-color: #DA343A;
            transform: translateY(-1px);
          }
          .intro-box {
            background-color: rgba(14, 33, 55, 0.6);
            border: 1px solid #1E3752;
            border-radius: 14px;
            padding: 16px 20px;
            margin-bottom: 24px;
            font-size: 13px;
            color: #A3B8CC;
          }
          .intro-box b {
            color: #FFFFFF;
          }
          .table-card {
            background-color: #0E2137;
            border: 1px solid #28445E;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }
          th {
            background-color: #122B45;
            color: #839BB5;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.8px;
            padding: 14px 18px;
            border-bottom: 1px solid #28445E;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid #1B324A;
            color: #D3E0EA;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: rgba(255, 255, 255, 0.03);
          }
          td a {
            color: #7DD3FC;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.15s;
          }
          td a:hover {
            color: #EF4248;
            text-decoration: underline;
          }
          .priority-tag {
            display: inline-block;
            background: rgba(16, 185, 129, 0.15);
            color: #34D399;
            border-radius: 6px;
            padding: 2px 8px;
            font-weight: 700;
            font-size: 11px;
          }
          .footer-note {
            text-align: center;
            margin-top: 32px;
            font-size: 12px;
            color: #627D98;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">
              <div class="logo-badge">O</div>
              <div>
                <span class="badge-sitemap">Index Officiel Google XML</span>
                <h1>Sitemap XML — ONTARIO Magazine</h1>
                <p>Protocole standard sitemaps.org pour l'indexation Google Search, Bing et Yandex</p>
              </div>
            </div>
            <a href="/" class="btn-home">← Retourner au site officiel</a>
          </div>

          <div class="intro-box">
            Ce fichier XML indexe l'ensemble des <b>pages institutionnelles</b>, <b>rubriques éditoriales</b> et <b>articles de référence</b> publiés sur le média ONTARIO. Il est surveillé en temps réel par les moteurs de recherche.
          </div>

          <div class="table-card">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL Canonique</th>
                  <th style="width: 15%;">Fréquence</th>
                  <th style="width: 15%;">Priorité</th>
                  <th style="width: 15%;">Dernière Révision</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <span class="priority-tag">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:lastmod">
                          <xsl:value-of select="sitemap:lastmod"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <span style="color: #627D98;">Automatique</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="footer-note">
            © 2026 ONTARIO Magazine — Généré dynamiquement conforme aux directives Google Search Console.
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
