messenger.compose.onAfterSend.addListener(async (tab, sendInfo) => {
  for (const msg of sendInfo.messages || []) {
    try {
      const atts = await messenger.messages.listAttachments(msg.id);
      const parts = atts
        .filter(a => !a.contentType.startsWith("text/x-moz-deleted"))
        .map(a => a.partName);

      if (parts.length) {
        await messenger.messages.deleteAttachments(msg.id, parts);
      }
    } catch (e) {
      console.error("Could not strip attachments:", e);
    }
  }
});
