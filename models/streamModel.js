const pg = require('pg');
const config = require('../config/database');

const db = new pg.Pool(config);

const streamModel = {
  async createComment(description, user_id, streamId) {
    const query = {
      text: 'INSERT INTO comment(description,user_id) VALUES($1,$2) RETURNING *',
      values: [description, user_id],
    };
    try {
      const rows = await db.query(query);
      const { comment_id } = result.rows[0];
      this.addCommentIdToStream(comment_id, streamId);
      return rows;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not create this comment');
    }
  },
  async addCommentIdToStream(commentId, streamId) {
    const query = {
      text: 'INSERT INTO streams(comment_id) VALUES($1) WHERE streamd_id =$2',
      values: [commentId, streamId],
    };
    try {
      const rows = await db.query(query);
      return rows;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not add this to stream');
    }
  },
  async createTag(description) {
    const query = {
      text: 'INSERT INTO tag(description) VALUES($1) RETURNING *',
      values: [id, description],
    };
    try {
      const rows = await db.query(query);
      return rows;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not create this tag');
    }
  },
  async createStream(stream) {
    const query = {
      text: 'INSERT INTO stream(date,time,tag_id,title,user_id) VALUES($2,$3,$4,$5,$6) RETURNING *',
      values: [stream.time, stream.tag_id, stream.title, stream.user_id],
    };
    try {
      const rows = await db.query(query);
      return rows;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not create this stream');
    }
  },
  async getAllStreams() {
    const query = {
      text: 'SELECT url FROM streams',
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not retreive active streams');
    }
  },
  async getStream(id) {
    const query = {
      text: 'SELECT * FROM streams WHERE stream_id =$1',
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not find that stream');
    }
  },
  async getAllViews(id) {
    const query = {
      text: 'SELECT view_id FROM streams WHERE stream_id =$1',
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not get views');
    }
  },
  async getAllComments(id) {
    const query = {
      text: 'SELECT comment_id FROM streams WHERE stream_id =$1',
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not get views');
    }
  },
  async getAllTags() {
    const query = {
      text: 'SELECT tag FROM streams',
      values: [],
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Could not get views');
    }
  },
  async deleteStreamById(id) {
    const query = {
      text: 'DELETE FROM streams WHERE stream_id RETURNING *',
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows.length) {
        return rows;
      }
      return null;
    } catch (err) {
      console.log(err.stack);
      throw new Error('Couldnot delete this stream');
    }
  },
};

module.exports = streamModel;
