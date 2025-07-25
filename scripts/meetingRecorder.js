window.meetingRecorder = {
  mediaRecorder: null,
  chunks: [],
  async start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("MediaDevices API or getUserMedia not supported");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    this.mediaRecorder.start();
  },
  async stop() {
    if (!this.mediaRecorder) {
      return null;
    }
    return new Promise(resolve => {
      this.mediaRecorder.onstop = async () => {
        let mimeType = 'audio/webm'; // Default fallback MIME type
        if (this.chunks.length > 0 && this.chunks[0].type) {
          mimeType = this.chunks[0].type; // Use the actual MIME type if available
        } else {
          console.warn("No valid MIME type found in chunks; using fallback MIME type 'audio/webm'.");
        }
        const blob = new Blob(this.chunks, { type: mimeType });
        const arrayBuffer = await blob.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        resolve({ base64: base64, type: blob.type });
        this.mediaRecorder = null;
      };
      this.mediaRecorder.stop();
    });
  }
};
