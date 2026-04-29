const FACEBOOK_PAGE_ID = "100090756825573";
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export async function getFacebookPosts(req, res) {
  if (!FACEBOOK_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Facebook access token not configured" });
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,full_picture,permalink_url,attachments{media,description}&limit=6&access_token=${FACEBOOK_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const posts = (data.data || []).map((post) => ({
      id: post.id,
      message: post.message || "",
      createdTime: post.created_time,
      image: post.full_picture || post.attachments?.data?.[0]?.media?.image?.src || null,
      permalink: post.permalink_url || `https://facebook.com/${post.id}`,
      description: post.attachments?.data?.[0]?.description || "",
    }));

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Facebook posts" });
  }
}
