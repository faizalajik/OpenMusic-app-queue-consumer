const { Pool } = require('pg');
 
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsById(id, owner) {
    // await this.verifyPlaylistAccess(id, owner)

    const queryMusic = {
      text: `SELECT
      playlists."id" as playlistid, 
      playlists."name", 
      songs."id", 
      songs.title, 
      songs.performer, 
      users.username
    FROM
      playlists
      INNER JOIN
      playlist_songs
      ON 
        playlists."id" = playlist_songs.playlist_id
      INNER JOIN
      songs
      ON 
        playlist_songs.song_id = songs."id"
      INNER JOIN
      users
      ON 
        playlists."owner" = users."id"
    WHERE
      playlists."id" =  $1`,
      values: [id],
    };
    const resultMusic = await this._pool.query(queryMusic);

    console.log(resultMusic)

    const res = {
      "playlist": {
        "id": resultMusic.rows[0].playlistid,
        "name": resultMusic.rows[0].name,
        "username": resultMusic.rows[0].username,
        // "songs": resultMusic.rows.map(mapMusicDBToModel)
      }
    };

    return res;
  }
}
 
module.exports = PlaylistService;
