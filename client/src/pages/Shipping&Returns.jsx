
export default function ShippingReturns() {
  return (
    <div className="mb-24">
      <Helmet>
        <title>Terhire | Shipping & Returns</title>
        <meta
          name="description"
          content="TERHIRE currently ships to all provinces in Canada and the United
          States. Regrettably, international shipping beyond Canada and the
          U.S. is not available at this time. We hope to expand our shipping
          services globally soon."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/shipping_returns" />
      </Helmet>
      <div className="mb-16 h-52 md:h-60 px-2 bg-sub grid content-center">
        <p className="header text-4xl md:text-5xl text-center ">
          Shipping & returns
        </p>
      </div>
      <div className="w-[min(60rem,100%)] px-8 mx-auto grid gap-20">
        <div className="grid gap-20">
          <div className="grid gap-5">
            <p className="header text-[2rem]">
              What countries does TERHIRE ship to?
            </p>
            <p className="font-light">
              TERHIRE currently ships to all provinces in Canada and the United
              States. Regrettably, international shipping beyond Canada and the
              U.S. is not available at this time. We hope to expand our shipping
              services globally soon.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">How long does SHIPPING take?</p>
            <p className="font-light">
              Your order will be dispatched from Ajax, Ontario, within 1-2
              business days of placement, with a shipping confirmation email
              sent upon shipment.
              <br />
              <br />
              Standard shipping, handled through Canada Post Expedited Parcel,
              typically takes 3-4 business days within Ontario and 5-6 days for
              other provinces. It's important to note that the provided shipping
              times are estimates, and the actual duration may vary. The
              variability depends on Canada Post, potentially resulting in a
              shorter or longer delivery time frame.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">
              Can I CHANGE my shipping address after PLACING an order?
            </p>
            <p className="font-light">
              To update your shipping address, reach out to us at
              support@terhire.com with your order number before receiving a
              shipping confirmation email, and we'll assist you promptly. Once a
              shipping confirmation email is received, the order has been
              fulfilled and is en route to the address provided during checkout,
              making address changes no longer possible.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">Delayed delivery</p>
            <p className="font-light">
              For deliveries within Canada, please allow up to 14 business days,
              and for shipments to the US, allow up to 20 business days. If your
              order hasn't arrived within this time frame, kindly email us at
              support@terhire.com with your order number for assistance.
              <br />
              <br />
              Please note that if a package is lost due to an incorrect address
              provided during checkout we regret that we are unable to refund or
              resend the order.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">Incomplete or damaged products</p>
            <p className="font-light">
              If you've received a product that's incomplete or damaged, don't
              hesitate to reach out to us at support@terhire.com right away.
              It's crucial to report any issues within 5 working days from the
              date of delivery. Unfortunately, any concerns reported after this
              period won't be considered valid, except in extraordinary cases.
              Your satisfaction is our priority, and we're here to assist you
              promptly.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">
              Customer unavailability for delivery
            </p>
            <p className="font-light">
              Kindly be advised that if a customer, despite prior notification
              by the courier, is unavailable to receive the package, Terhire
              will not assume responsibility for replacement costs of any
              temperature-sensitive items that may incur damage due to the
              subsequent delay in reaching the customer.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">Refunds and exchange</p>
            <p className="font-light">
              For hygiene reasons, we regret that we are unable to process
              exchanges or returns for non-faulty items. Please be aware that
              refunds will not be issued after the order has been placed and
              shipped out. This policy strictly applies within a 12-hour time
              frame after order placement. Any refund inquiries beyond this
              period will not be considered. We appreciate your careful
              consideration before making a purchase.
            </p>
          </div>
          <div className="grid gap-5">
            <p className="header text-[2rem]">Order changes and modification</p>
            <p className="font-light">
              All order modifications must be requested within the initial 12
              hours of placing an order, as our commitment to swift shipping
              results in immediate order processing upon placement. Please send
              modification requests to our email at support@terhire, specifying
              the purchased items and the desired changes. We appreciate your
              cooperation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
