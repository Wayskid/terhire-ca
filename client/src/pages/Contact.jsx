import { useEffect } from "react";

export default function Contact() {
  return (
    <div className="mb-24">
      <div className="mb-16 h-52 md:h-60 px-2 bg-sub grid content-center">
        <p className="header text-4xl md:text-5xl text-center">Contact Us</p>
      </div>
      <div className="w-[min(60rem,100%)] px-8 mx-auto grid gap-20">
        <div className="grid gap-5">
          <p className="font-medium">Order related enquires</p>
          <p className="font-light">
            Explore our FAQ page for solutions to common questions. If you can't
            find what you need, don't hesitate to contact us at
            customercare@terhire.com. We're here to assist you!
          </p>
        </div>
        <div className="grid gap-5">
          <p className="font-medium">General inquires</p>
          <p className="font-light">
            For general inquiries about our products, services, feedback, or
            information requests, you can reach us at support@terhire.com. We
            appreciate your interest!
          </p>
        </div>
        <div className="grid gap-5">
          <p className="font-medium">Customer Service</p>
          <p className="font-light">
            Do you have questions about your order? Read our FAQ page for
            answers to common queries. If you still can't find what you're
            looking for, reach out to us at info@terhire.com and we'll
            get back to you as soon as we can.
            <br />
            <br />
            Please note we respond to emails during business hours only Monday
            through Friday.
          </p>
        </div>
        <div className="grid gap-5">
          <p className="font-medium">Join Forces with TERHIRE</p>
          <p className="font-light">
            Collaborations, Influencing, and UGC Creators Welcome! For
            partnership inquiries, influencing, and UGC creators, reach out to
            us at support@terhire.com
          </p>
        </div>
        <div className="grid gap-5">
          <p className="font-medium">ONLINE OPENING HOURS</p>
          <p className="font-light">
            Monday-Friday 9 am-6 pm
            <br />
            Saturday: 9 am-3 pm
            <br />
            Sunday: CLOSED
          </p>
        </div>
      </div>
    </div>
  );
}
