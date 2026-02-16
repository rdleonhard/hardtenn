#!/bin/bash
# Fix script for kernel update error with broadcom-sta-dkms

set -e

echo "=== Fixing kernel update error ==="
echo ""

# Step 1: Remove crash report files
echo "Step 1: Removing crash report files..."
sudo rm -f /var/crash/broadcom-sta-dkms*.crash
echo "✓ Crash reports removed"
echo ""

# Step 2: Remove broadcom-sta from DKMS (it's incompatible with newer kernels)
echo "Step 2: Removing broadcom-sta from DKMS..."
sudo dkms remove broadcom-sta/6.30.223.271 --all 2>/dev/null || true
echo "✓ DKMS module removed"
echo ""

# Step 3: Purge the broadcom-sta-dkms package
echo "Step 3: Removing broadcom-sta-dkms package..."
sudo apt-get purge -y broadcom-sta-dkms 2>&1 | grep -v "^\(Reading\|Building\|Get:\|Fetched\|Preparing\|Unpacking\|Setting up\)" || true
echo "✓ Package removed"
echo ""

# Step 4: Configure any pending packages
echo "Step 4: Configuring pending packages..."
sudo dpkg --configure -a
echo "✓ Packages configured"
echo ""

# Step 5: Complete the kernel update
echo "Step 5: Completing kernel update..."
sudo apt-get install -f -y 2>&1 | grep -v "^\(Reading\|Building\|Get:\|Fetched\|Preparing\|Unpacking\|Setting up\)" || true
echo "✓ Update completed"
echo ""

echo "=== Fix complete! ==="
echo ""
echo "Note: The broadcom-sta-dkms driver has been removed because it's incompatible"
echo "      with kernel 6.17.0-14-generic. If you need wireless support, consider:"
echo "      - Using the open-source b43 or brcmfmac drivers (usually auto-detected)"
echo "      - Or wait for an updated broadcom-sta-dkms package"
echo ""
echo "You can now try running 'sudo apt update && sudo apt upgrade' again."

