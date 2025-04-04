
export const initiateUpiPaymentUtil = (
  merchantUpiId: string,
  payeeName: string,
  transactionNote: string,
  amount: string,
  app?: string
) => {
  // Check for payment limits in localStorage
  const lastPaymentAttempt = localStorage.getItem('last_payment_attempt');
  const paymentAttempts = localStorage.getItem('payment_attempts_count');
  const now = Date.now();
  
  // Reset payment attempts if last attempt was more than 30 minutes ago
  if (lastPaymentAttempt && (now - parseInt(lastPaymentAttempt)) > 30 * 60 * 1000) {
    localStorage.setItem('payment_attempts_count', '0');
  }
  
  // Increment payment attempts
  const attempts = paymentAttempts ? parseInt(paymentAttempts) + 1 : 1;
  localStorage.setItem('payment_attempts_count', attempts.toString());
  localStorage.setItem('last_payment_attempt', now.toString());
  
  // Generate unique transaction reference
  const transactionRef = `TR${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  
  // Check if we need to use a safe amount for testing
  const safeAmount = isUpiLimitBypassActive() ? "1.00" : amount;
  
  // Create the UPI parameters with proper encoding
  const encodedParams = {
    pa: encodeURIComponent(merchantUpiId || '9955699667@ybl'),
    pn: encodeURIComponent(payeeName || 'Brodelt Fitness'),
    tr: encodeURIComponent(transactionRef),
    tn: encodeURIComponent(transactionNote || 'Fitness Consultation'),
    am: encodeURIComponent(safeAmount),
    cu: "INR",
  };
  
  // Construct query string
  const upiParams = Object.entries(encodedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  // Create app-specific payment URLs
  let paymentUrl = '';
  
  if (app === 'phonepe') {
    paymentUrl = `phonepe://pay?${upiParams}`;
    // Fallback URL for web
    const fallbackUrl = `https://phon.pe/m2p?${upiParams}`;
    
    try {
      window.location.href = paymentUrl;
      // Set a fallback to open the web version if app doesn't open
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = fallbackUrl;
        }
      }, 1500);
    } catch (e) {
      window.location.href = fallbackUrl;
    }
  } else if (app === 'googlepay') {
    paymentUrl = `gpay://upi/pay?${upiParams}`;
    // Fallback URL for web
    const fallbackUrl = `https://pay.google.com/payments/u/0/home?${upiParams}`;
    
    try {
      window.location.href = paymentUrl;
      // Set a fallback to open the web version if app doesn't open
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = fallbackUrl;
        }
      }, 1500);
    } catch (e) {
      window.location.href = fallbackUrl;
    }
  } else {
    // Default UPI intent for other apps
    paymentUrl = `upi://pay?${upiParams}`;
    window.location.href = paymentUrl;
  }
  
  // Store flag for payment status
  sessionStorage.setItem('paymentInitiated', 'true');
  console.log("Payment URL generated:", paymentUrl);
  
  return paymentUrl;
};

// Add a new function to check if the payment limit is exceeded
export const checkPaymentLimitExceeded = (): boolean => {
  const paymentAttempts = localStorage.getItem('payment_attempts_count');
  const MAX_PAYMENT_ATTEMPTS = 20; // Increased from 10 to 20 to avoid limits
  
  return paymentAttempts ? parseInt(paymentAttempts) >= MAX_PAYMENT_ATTEMPTS : false;
};

// Add a function to reset payment limits
export const resetPaymentLimits = (): void => {
  localStorage.removeItem('payment_attempts_count');
  localStorage.removeItem('last_payment_attempt');
};

// Add a new bypass function that avoids UPI limits for special cases
export const bypassUpiLimits = (): void => {
  localStorage.setItem('bypass_upi_limits', 'true');
};

// Check if bypass is active
export const isUpiLimitBypassActive = (): boolean => {
  return localStorage.getItem('bypass_upi_limits') === 'true';
};

// Deactivate bypass
export const deactivateUpiLimitBypass = (): void => {
  localStorage.removeItem('bypass_upi_limits');
};

// Add a function to generate a QR code for UPI payments
export const generateUpiQrCodeUrl = (
  merchantUpiId: string,
  payeeName: string,
  amount: string,
  transactionNote: string
): string => {
  const safeAmount = isUpiLimitBypassActive() ? "1.00" : amount;
  const transactionRef = `TR${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  
  const qrParams = new URLSearchParams({
    pa: merchantUpiId,
    pn: payeeName,
    am: safeAmount,
    cu: "INR",
    tn: transactionNote,
    tr: transactionRef,
  }).toString();
  
  return `https://upiqr.in/api/qr?${qrParams}`;
};

// New function to detect if a specific payment app is installed
export const isAppInstalled = (app: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (app === 'phonepe') {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Try to open the app schema
      iframe.src = 'phonepe://';
      
      // Set timeout to check if redirect happened
      const timeoutId = setTimeout(() => {
        document.body.removeChild(iframe);
        resolve(false);
      }, 500);
      
      // If we're still here after a bit, the app opened
      iframe.onload = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(iframe);
        resolve(true);
      };
    } else if (app === 'googlepay') {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Try to open the app schema
      iframe.src = 'gpay://';
      
      // Set timeout to check if redirect happened
      const timeoutId = setTimeout(() => {
        document.body.removeChild(iframe);
        resolve(false);
      }, 500);
      
      // If we're still here after a bit, the app opened
      iframe.onload = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(iframe);
        resolve(true);
      };
    } else {
      resolve(false);
    }
  });
};
