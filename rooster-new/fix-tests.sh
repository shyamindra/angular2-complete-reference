#!/bin/bash

# Fix test file imports for all components
# This script updates the import statements and component references in test files

echo "Fixing test file imports..."

# Array of component mappings (old_name -> new_name)
declare -A components=(
    ["Cancellation"]="CancellationComponent"
    ["Complaints"]="ComplaintsComponent"
    ["ContactUs"]="ContactUsComponent"
    ["Disclaimer"]="DisclaimerComponent"
    ["Faq"]="FaqComponent"
    ["Info"]="InfoComponent"
    ["Landing"]="LandingComponent"
    ["Payment"]="PaymentComponent"
    ["PayuPayment"]="PayuPaymentComponent"
    ["PrivacyPolicy"]="PrivacyPolicyComponent"
    ["Promotions"]="PromotionsComponent"
    ["Search"]="SearchComponent"
    ["Terms"]="TermsComponent"
)

# Fix each component's test file
for old_name in "${!components[@]}"; do
    new_name="${components[$old_name]}"
    echo "Fixing $old_name -> $new_name"
    
    # Find the test file for this component
    test_file=$(find src/app -name "*${old_name,,}*.spec.ts" 2>/dev/null)
    
    if [ -n "$test_file" ]; then
        echo "  Processing: $test_file"
        
        # Update import statement
        sed -i '' "s/import { $old_name }/import { $new_name }/g" "$test_file"
        
        # Update describe block
        sed -i '' "s/describe('$old_name'/describe('$new_name'/g" "$test_file"
        
        # Update component type declarations
        sed -i '' "s/let component: $old_name;/let component: $new_name;/g" "$test_file"
        sed -i '' "s/let fixture: ComponentFixture<$old_name>;/let fixture: ComponentFixture<$new_name>;/g" "$test_file"
        
        # Update TestBed imports
        sed -i '' "s/imports: \[$old_name\]/imports: [$new_name]/g" "$test_file"
        
        # Update createComponent calls
        sed -i '' "s/createComponent($old_name)/createComponent($new_name)/g" "$test_file"
    else
        echo "  Test file not found for $old_name"
    fi
done

echo "Test file fixes completed!" 