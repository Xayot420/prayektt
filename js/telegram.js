/**
 * Telegram: Telegram bot integration functionality
 */

const Telegram = {
  // Telegram bot token and chat ID
  BOT_TOKEN: '7841040971:AAHoLEyhDee-33qig1C6IAFkuGK6TL0LzMA',
  CHAT_ID: '5234014730',
  API_URL: 'https://api.telegram.org/bot',

  /**
   * Send message to Telegram
   * @param {string} message - Message to send
   * @returns {Promise} Promise resolving to response data
   */
  async sendMessage(message) {
    try {
      const response = await fetch(`${this.API_URL}${this.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      throw error;
    }
  },

  /**
   * Format order details for Telegram message
   * @param {Object} order - Order data
   * @returns {string} Formatted message
   */
  formatOrderMessage(order) {
    const items = order.items.map(item => 
      `• ${item.title} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    return `
🛍 <b>New Order Received!</b>

<b>Order Details:</b>
${items}

<b>Subtotal:</b> $${(order.total - order.shipping).toFixed(2)}
<b>Shipping:</b> $${order.shipping.toFixed(2)}
<b>Total:</b> $${order.total.toFixed(2)}

<b>Status:</b> ${order.status}
<b>Date:</b> ${new Date(order.date).toLocaleString()}
`;
  },

  /**
   * Send customer support message
   * @param {Object} data - Support message data
   * @returns {Promise} Promise resolving to response data
   */
  async sendSupportMessage(data) {
    const message = `
📞 <b>Customer Support Request</b>

<b>From:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Subject:</b> ${data.subject}

<b>Message:</b>
${data.message}
`;

    return this.sendMessage(message);
  },

  /**
   * Send order notification
   * @param {Object} order - Order data
   * @returns {Promise} Promise resolving to response data
   */
  async sendOrderNotification(order) {
    const message = this.formatOrderMessage(order);
    return this.sendMessage(message);
  }
};

// Export Telegram module
window.Telegram = Telegram;