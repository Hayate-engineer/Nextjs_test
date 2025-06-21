import "dotenv/config";
import fetch from "node-fetch";

const addUser = async (username) => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;
  const id = Math.floor(Math.random() * 1000000);

  // fetch用のヘッダーオブジェクト（コメントOK）
  const headers = {
    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ id, username })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("エラーが発生しました:", result);
  } else {
    console.log("登録成功:", result);
  }
};

// addUser("高橋風香");

const updateUser = async (id, newUsername) => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?id=eq.${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({ username: newUsername })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("エラーが発生しました:", result);
  } else {
    console.log("更新成功:", result);
  }
};

updateUser(3, "田中花子"); // ← IDと新しい名前を指定

  // const deleteUser = async (id) => {
  //   const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?id=eq.${id}`;
  
  //   const response = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //       "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  //     }
  //   });
  
  //   console.log(`ユーザーID ${id} を削除しました`);
  // };

  // deleteUser(3)