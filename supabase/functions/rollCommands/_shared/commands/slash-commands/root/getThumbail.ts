export const getThumbnail = (total: number): string => {
  const root =
    "https://raw.githubusercontent.com/RANDSUM/DiscordBot/main/supabase/functions/_shared/assets/root/"

  if (total < -4) {
    return `${root}bigmiss.png`
  }
  if (total > 16) {
    return `${root}bighit.png`
  }
  return `${root}${total}.png`
}
