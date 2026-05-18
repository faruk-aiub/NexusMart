import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOrderConfirmationEmail(order: any) {
    try {
      await this.mailerService.sendMail({
        to: order.user.email,
        subject: `Order Confirmation - #${order.id}`,
        html: `
          <h2>Thank you for your order, ${order.user.fullName}!</h2>
          <p>Your order has been placed successfully.</p>

          <p><strong>Order ID:</strong> #${order.id}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <p><strong>Delivery Address:</strong> ${order.address}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

          <p>We will process your order soon.</p>

          <p>Regards,<br />NexusMart Team</p>
        `,
      });

      console.log('Order confirmation email sent');
    } catch (error) {
      console.log('Order confirmation email failed');
    }
  }

  async sendOrderStatusEmail(order: any) {
    try {
      await this.mailerService.sendMail({
        to: order.user.email,
        subject: `Order Status Updated - #${order.id}`,
        html: `
          <h2>Hello ${order.user.fullName},</h2>
          <p>Your order status has been updated.</p>

          <p><strong>Order ID:</strong> #${order.id}</p>
          <p><strong>Current Status:</strong> ${order.orderStatus}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>

          <p>Thank you for shopping with NexusMart.</p>

          <p>Regards,<br />NexusMart Team</p>
        `,
      });

      console.log('Order status email sent');
    } catch (error) {
      console.log('Order status email failed');
    }
  }
}