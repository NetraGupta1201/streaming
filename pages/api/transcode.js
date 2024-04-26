// pages/api/transcode.js

const { spawn } = require('child_process');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { quality } = req.query;
  const originalVideoUrl = req.query.videoUrl;

  // Transcoding options based on quality
  const transcodeOptions = {
    '360p': ['-vf', 'scale=-2:360', '-c:v', 'libx264', '-b:v', '400k'],
    '480p': ['-vf', 'scale=-2:480', '-c:v', 'libx264', '-b:v', '800k'],
    '720p': ['-vf', 'scale=-2:720', '-c:v', 'libx264', '-b:v', '1500k'],
    '1080p': ['-vf', 'scale=-2:1080', '-c:v', 'libx264', '-b:v', '3000k'],
  };

  // Spawn FFmpeg process to transcode and stream the video
  const ffmpeg = spawn('ffmpeg', [
    '-i', originalVideoUrl,
    ...transcodeOptions[quality],
    '-f', 'mp4',
    '-movflags', 'frag_keyframe+empty_moov',
    'pipe:1'
  ]);

  // Pipe FFmpeg output to HTTP response
  ffmpeg.stdout.pipe(res);

  // Handle FFmpeg errors
  ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg error: ${data}`);
  });

  ffmpeg.stderr.on('end', () => {
    console.log('FFmpeg process finished');
  });

  ffmpeg.on('error', (error) => {
    console.error('FFmpeg spawn error:', error);
    res.status(500).send('Error transcoding and streaming video');
  });

  // Handle client disconnection
  req.on('close', () => {
    console.log('Client disconnected');
    ffmpeg.kill();
  });
}
