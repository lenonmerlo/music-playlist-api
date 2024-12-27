let playlists = [];

module.exports = {
  // Obter todas as playlists
  index: (req, res) => {
    res.json(playlists);
  },

  // Obter uma playlist específica
  show: (req, res) => {
    const { id } = req.params;
    const playlist = playlists.find(p => p.id === +id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    res.json(playlist);
  },

  // Criar nova playlist
  save: (req, res) => {
    const { name, tags, music } = req.body;

    if (!name || !tags) {
      return res.status(400).json({ message: 'Nome e tags são obrigatórios' });
    }

    const newPlaylist = {
      id: playlists.length + 1,
      name,
      tags,
      music: music || []
    };

    playlists.push(newPlaylist);
    res.status(201).json(newPlaylist);
  },

  // Atualizar playlist
  update: (req, res) => {
    const { id } = req.params;
    const { name, tags } = req.body;

    const playlist = playlists.find(p => p.id === +id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    if (name) playlist.name = name;
    if (tags) playlist.tags = tags;

    res.json(playlist);
  },

  // Deletar playlist
  delete: (req, res) => {
    const { id } = req.params;
    const playlistIndex = playlists.findIndex(p => p.id === +id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    playlists.splice(playlistIndex, 1);
    res.status(204).end();
  },

  // Adicionar música em uma playlist
  addMusic: (req, res) => {
    const { id } = req.params;
    const { title, year, artist, album } = req.body;

    const playlist = playlists.find(p => p.id === +id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    if (!title || !year || !artist || !album) {
      return res.status(400).json({ message: 'Título, ano, artista e álbum são obrigatórios' });
    }

    const newMusic = { id: playlist.music.length + 1, title, year, artist, album };
    playlist.music.push(newMusic);
    res.status(201).json(newMusic);
  },

  // Remover música de uma playlist
  removeMusic: (req, res) => {
    const { id, musicId } = req.params;

    const playlist = playlists.find(p => p.id === +id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    const musicIndex = playlist.music.findIndex(m => m.id === +musicId);

    if (musicIndex === -1) {
      return res.status(404).json({ message: 'Música não encontrada' });
    }

    playlist.music.splice(musicIndex, 1);
    res.status(204).end();
  }
};
