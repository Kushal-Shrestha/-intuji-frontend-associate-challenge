document.addEventListener("DOMContentLoaded", function () {
  const savingPlans = [
    {
      title: "Bali Vacation",
      target: "August 25 2022",
      current: 1950.21,
      goal: 4000,
      percentage: 48,
      color: "var(--primary-color)",
    },
    {
      title: "New Gadget",
      target: "August 25 2022",
      current: 790.21,
      goal: 1000,
      percentage: 79,
      color: "#FFB800",
    },
    {
      title: "Charity",
      target: "August 25 2022",
      current: 32111,
      goal: 100,
      percentage: 32,
      color: "#00C48C",
    },
  ];

  // Function to format currency
  function formatCurrency(amount) {
    if (amount >= 1000) {
      return (
        "$" +
        amount.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      );
    } else {
      return (
        "$" +
        amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  }

  // Get the container to insert the saving plans
  const savingPlanContent = document.querySelector(".saving-plan-content");

  // Generate HTML for each saving plan
  savingPlans.forEach((plan, index) => {
    // Create saving plan item container
    const savingPlanItem = document.createElement("div");
    savingPlanItem.className = "saving-plan__item";

    // Create header with title and target date
    const itemHeader = document.createElement("div");
    itemHeader.className = "saving-plan__item-header";

    const itemTitle = document.createElement("h3");
    itemTitle.className = "saving-plan__item-title plus-jakarta-sans-semibold";
    itemTitle.textContent = plan.title;

    const itemTarget = document.createElement("p");
    itemTarget.className = "saving-plan__item-target plus-jakarta-sans-regular";
    itemTarget.textContent = `Target: ${plan.target}`;

    itemHeader.appendChild(itemTitle);
    itemHeader.appendChild(itemTarget);

    // Create amount and percentage row
    const itemAmountRow = document.createElement("div");
    itemAmountRow.className = "saving-plan__item-amount-row";

    // Create amount section
    const itemAmount = document.createElement("div");
    itemAmount.className = "saving-plan__item-amount";

    const itemCurrent = document.createElement("span");
    itemCurrent.className = "saving-plan__item-current plus-jakarta-sans-bold";
    itemCurrent.textContent = formatCurrency(plan.current);

    const itemGoal = document.createElement("span");
    itemGoal.className = "saving-plan__item-goal plus-jakarta-sans-regular";
    itemGoal.textContent = `/${formatCurrency(plan.goal)}`;

    itemAmount.appendChild(itemCurrent);
    itemAmount.appendChild(itemGoal);

    // Create percentage display
    const itemPercentage = document.createElement("div");
    itemPercentage.className = "saving-plan__item-percentage";
    itemPercentage.textContent = `${plan.percentage}%`;
    itemPercentage.style.color = plan.color;

    // Add amount and percentage to the row
    itemAmountRow.appendChild(itemAmount);
    itemAmountRow.appendChild(itemPercentage);

    // Create progress bar
    const itemProgress = document.createElement("div");
    itemProgress.className = "saving-plan__item-progress";

    const itemProgressBar = document.createElement("div");
    itemProgressBar.className = "saving-plan__item-progress-bar";
    itemProgressBar.style.setProperty(
      "--progress-width",
      `${plan.percentage}%`
    );
    itemProgressBar.style.backgroundColor = plan.color;

    itemProgress.appendChild(itemProgressBar);

    // Assemble the full item
    savingPlanItem.appendChild(itemHeader);
    savingPlanItem.appendChild(itemAmountRow);
    savingPlanItem.appendChild(itemProgress);

    // Add to container
    savingPlanContent.appendChild(savingPlanItem);
  });

  // Function to animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll(
      ".saving-plan__item-progress-bar"
    );

    progressBars.forEach((bar) => {
      const progressWidth = bar.style.getPropertyValue("--progress-width");
      bar.style.width = "0";
      bar.style.animation = "progressAnimation 1.5s ease-in-out forwards";
      setTimeout(() => {
        bar.style.width = progressWidth;
      }, 1500);
    });
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Animate progress bars on page load
  animateProgressBars();

  // Check and animate when scrolling
  document.addEventListener("scroll", function () {
    const savingPlanSection = document.querySelector(".saving__plan");
    if (isInViewport(savingPlanSection)) {
      animateProgressBars();
    }
  });
});
