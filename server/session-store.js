function getRedisSessionId(sid) {
  return `ssid: ${sid}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }
  // 获取Redis中存取的session数据
  async get(sid) {
    // console.log("get session", sid);
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {}
  }

  // 存储session数据到Redis
  async set(sid, session, ttl) {
    // console.log("set session", sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessionStr = JSON.stringify(session);
      if (ttl) {
        await this.client.setex(id, ttl, sessionStr);
      } else {
        await this.client.set(id, sessionStr);
      }
    } catch (err) {}
  }

  // 从Redis中删除某个数据
  async destroy(sid) {
    // console.log("destroy session", sid);
    const id = getRedisSessionId(sid);
    this.client.del(id);
  }
}

module.exports = RedisSessionStore;
