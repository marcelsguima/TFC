export const leaderboardHome = `SELECT 
  team.team_name AS name, 
  SUM(CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END) AS totalPoints,
  COUNT(matches.home_team_id) AS totalGames,
  SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
  SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
  SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
  SUM(matches.home_team_goals) AS goalsFavor,
  SUM(matches.away_team_goals) AS goalsOwn,
  SUM(matches.home_team_goals - matches.away_team_goals) AS goalsBalance,
  FORMAT(
    (SUM(CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END) / (COUNT(matches.home_team_id) * 3)) * 100, 
    2
  ) AS efficiency
FROM teams AS team
JOIN matches AS matches ON team.id = matches.home_team_id
WHERE matches.in_progress = false
GROUP BY team.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC`;

export const leaderboardAway = `SELECT 
 team.team_name AS name, 
 SUM(CASE
     WHEN matches.away_team_goals > matches.home_team_goals THEN 3
     WHEN matches.away_team_goals = matches.home_team_goals THEN 1
     ELSE 0
   END) AS totalPoints,
 COUNT(matches.away_team_id) AS totalGames,
 SUM(matches.away_team_goals > matches.home_team_goals) AS totalVictories,
 SUM(matches.away_team_goals = matches.home_team_goals) AS totalDraws,
 SUM(matches.away_team_goals < matches.home_team_goals) AS totalLosses,
 SUM(matches.away_team_goals) AS goalsFavor,
 SUM(matches.home_team_goals) AS goalsOwn,
 SUM(matches.away_team_goals - matches.home_team_goals) AS goalsBalance,
 FORMAT(
   (SUM(CASE
     WHEN matches.away_team_goals > matches.home_team_goals THEN 3
     WHEN matches.away_team_goals = matches.home_team_goals THEN 1
     ELSE 0
   END) / (COUNT(matches.away_team_id) * 3)) * 100, 
   2
 ) AS efficiency
FROM teams AS team
JOIN matches AS matches ON team.id = matches.away_team_id
WHERE matches.in_progress = false
GROUP BY team.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
`;
