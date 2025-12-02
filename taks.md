# Implementation Plan

- [x] 1. Integrate with existing project and add dependencies








  - **SKIP**: React + TypeScript + Vite already set up
  - **SKIP**: Tailwind CSS v4 already configured
  - Install NEW dependencies: @supabase/supabase-js, Zustand, React Query, React Virtuoso, fast-check, React DnD
  - Add Supabase environment variables to `.env.local` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
  - Create NEW folder structure within existing: `src/components/siteplan/`, `src/hooks/siteplan/`, `src/utils/siteplan/`, `src/types/siteplan/`
  - **NOTE**: Reuse existing `src/services/dataService.ts` structure, extend with Supabase
  - _Requirements: 14.1, 14.6_

  - [-] 2.1 Create SeniorThemeProvider context extending existing design

  - [ ] 2.1 Create SeniorThemeProvider context extending existing design

    - **REUSE**: Existing Tailwind config and color palette (emerald #10b981, regional colors)
    - **ADD**: Senior-friendly typography scale (body 18px, label 16px, unitNumber 20px, heading 24px)
    - **ADD**: Touch target sizes (standard 56px, large 64px, spacing 16px)
    - **VERIFY**: Existing colors already meet WCAG AA contrast ratios
    - **ADD**: Animation settings (300ms minimum duration) - existing uses transition-all
    - **NOTE**: Use existing Tailwind utilities where possible (text-lg, p-4, rounded-xl, shadow-lg)
    - _Requirements: 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.24_

  - [ ]* 2.2 Write property test for senior-friendly typography
    - **Property 23: Senior-friendly body text size**
    - **Validates: Requirements 28.1**

  - [ ]* 2.3 Write property test for touch target sizes
    - **Property 25: Senior-friendly touch target size**
    - **Validates: Requirements 28.5**

  - [ ]* 2.4 Write property test for color contrast compliance
    - **Property 27: WCAG AA color contrast compliance**
    - **Validates: Requirements 28.7**

- [-] 3. Implement database schema and Supabase setup





  - [ ] 3.1 Create database tables in Supabase
    - Create projects table with layout_type and layout_config JSONB
    - Create canvas_elements table for canvas editor
    - Create units table with status and position fields
    - Create bookings table with file URLs
    - Create transactions table with commission calculation
    - Create marketing_agents table extending auth.users
    - _Requirements: 14.1, 14.5_

  - [ ] 3.2 Implement Row Level Security (RLS) policies
    - Create policy for marketing agents to view/edit own bookings
    - Create policy for superadmin full access
    - Create policy for public to view published projects only
    - _Requirements: 6.2, 6.3, 7.2, 7.3_

  - [ ] 3.3 Set up Supabase Storage buckets
    - Create 'documents' bucket for KK/KTP files
    - Create 'backgrounds' bucket for canvas editor background images
    - Create 'thumbnails' bucket for project thumbnails
    - Configure storage policies for secure file access
    - _Requirements: 6A.5, 23A.2, 23A.10_

- [ ] 4. Implement core data models and TypeScript interfaces
  - Create Project, Unit, Booking, Transaction, MarketingAgent interfaces
  - Create GridConfig, LinearConfig, CurvedConfig interfaces
  - Create CanvasElement and related property interfaces
  - Implement validation functions for booking data and file uploads
  - _Requirements: 11.1, 14.5_

- [ ]* 4.1 Write property test for file upload validation
  - **Property 5: File upload validation for KK**
  - **Property 6: File upload validation for KTP**
  - **Validates: Requirements 6A.3, 6A.4**

- [ ] 5. Implement authentication system
  - [ ] 5.1 Create AuthProvider context with Supabase Auth
    - Implement login, logout, and session management
    - Handle authentication errors with senior-friendly messages
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4_

  - [ ] 5.2 Create protected route components
    - Implement MarketingProtectedRoute for marketing dashboard
    - Implement AdminProtectedRoute for admin dashboard
    - _Requirements: 6.2, 7.2_

  - [ ] 5.3 Create login pages for marketing and admin
    - Design login form with large input fields (56px height)
    - Implement error handling with large, clear messages
    - _Requirements: 6.1, 7.1, 28.14, 28.15_

- [ ] 6. Implement polymorphic MapRenderer component
  - [ ] 6.1 Create base MapRenderer component with layout strategy pattern
    - Accept layoutType prop ('grid' | 'linear' | 'curved')
    - Accept layoutConfig prop (GridConfig | LinearConfig | CurvedConfig)
    - Accept mode prop ('public' | 'marketing' | 'admin')
    - Implement strategy selection based on layoutType
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 6.2 Implement GridLayoutStrategy
    - Calculate grid positions with rows, cols, rotation, and spacing
    - Apply CSS Grid with transform rotation
    - _Requirements: 11.2, 3.1_

  - [ ]* 6.3 Write property test for grid layout positioning
    - **Property 13: Grid layout positioning correctness**
    - **Validates: Requirements 11.2**

  - [ ] 6.4 Implement LinearLayoutStrategy
    - Calculate linear positions with spacing
    - Integrate React Virtuoso for virtualization when units > 50
    - _Requirements: 11.3, 12.2, 3.2_

  - [ ]* 6.5 Write property test for linear layout rendering
    - **Property 14: Linear layout rendering**
    - **Validates: Requirements 11.3**

  - [ ] 6.6 Implement CurvedLayoutStrategy with SVG arc calculations
    - Create calculateArcPositions utility function
    - Generate SVG path for curved rows
    - Position units along arc using trigonometry
    - _Requirements: 11.4, 11.5, 12.1, 24.3, 24.5_

  - [ ]* 6.7 Write property test for curved layout arc positioning
    - **Property 15: Curved layout arc positioning**
    - **Property 21: SVG arc path calculation correctness**
    - **Validates: Requirements 11.4, 24.3**

- [ ] 7. Implement UnitElement component
  - [ ] 7.1 Create UnitElement with status-based styling
    - Render unit with color based on status (white/yellow/red)
    - Display unit number with 20px bold font for senior mode
    - Implement minimum 56px touch target for senior mode
    - Add hover and selection states with 300ms transitions
    - _Requirements: 4.1, 4.2, 4.3, 3.4, 28.3, 28.5, 28.24_

  - [ ]* 7.2 Write property test for unit number visibility
    - **Property 24: Senior-friendly unit number size**
    - **Validates: Requirements 28.3**

  - [ ]* 7.3 Write property test for touch target size
    - **Property 16: Minimum touch target size compliance**
    - **Validates: Requirements 15.4**

  - [ ] 7.4 Implement unit click handlers for different modes
    - Public mode: show unit detail modal
    - Marketing mode: show booking modal
    - Admin mode: toggle selection state
    - _Requirements: 4.4, 4.5, 6A.2, 9.2_

- [ ] 8. Implement real-time synchronization with Supabase Realtime
  - [ ] 8.1 Create useUnitRealtime hook
    - Subscribe to unit changes for specific project
    - Handle INSERT, UPDATE, DELETE events
    - Update local state in real-time
    - _Requirements: 4.6, 10.7, 14.4_

  - [ ]* 8.2 Write property test for real-time status synchronization
    - **Property 1: Real-time status synchronization**
    - **Validates: Requirements 4.6, 10.7**

  - [ ] 8.3 Create useBookingRealtime hook for marketing dashboard
    - Subscribe to booking changes for specific marketing agent
    - Update dashboard statistics in real-time
    - _Requirements: 6A.8, 6B.1, 6B.2_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Replace existing SitePlanPage with interactive project selection
  - [ ] 10.1 Replace `components/SitePlanPage.tsx` with new ProjectSelector component
    - **REPLACE**: Current static siteplan page with dynamic project selector
    - **REUSE**: Existing tab navigation structure (Jogja/Bogor/Borneo tabs)
    - **REUSE**: Existing regional colors (jogja-gold, bogor-teal, borneo-orange)
    - Fetch published projects from Supabase (filter by status = 'published')
    - Display project cards with thumbnail, name, location, area, total units, available units count
    - Implement large touch targets (card height 280px minimum)
    - Use existing font classes: `font-serif text-3xl` for names, `text-xl` for stats
    - Sort projects by display_order field
    - **MAINTAIN**: Existing page structure (pt-32 for header offset, max-w-7xl container)
    - _Requirements: 1.1, 1.2, 1.3, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 28.4_

  - [ ]* 10.2 Write property test for homepage project visibility filtering
    - **Property 31: Homepage project visibility filtering**
    - **Validates: Requirements 26.1, 27.2, 27.3**

  - [ ]* 10.3 Write property test for project card data completeness
    - **Property 32: Project card data completeness**
    - **Validates: Requirements 26.2**

  - [ ]* 10.4 Write property test for project display order consistency
    - **Property 33: Project display order consistency**
    - **Validates: Requirements 26.5, 27.5**

  - [ ] 10.5 Implement featured project highlighting
    - Display featured projects with 4px solid green border
    - _Requirements: 27.6_

  - [ ]* 10.6 Write property test for featured project highlighting
    - **Property 35: Featured project highlighting**
    - **Validates: Requirements 27.6**

  - [ ] 10.7 Implement sold out badge
    - Display "Sold Out" badge when available units = 0
    - Still allow navigation to project view
    - Use 18px font with high contrast
    - _Requirements: 26.7_

  - [ ]* 10.8 Write property test for sold out badge display condition
    - **Property 34: Sold out badge display condition**
    - **Validates: Requirements 26.7**

  - [ ] 10.9 Implement project navigation
    - Navigate to Masterplan View on project card click
    - Load correct layout type based on project configuration
    - _Requirements: 1.2, 1.4, 1.5, 1.6_

- [ ] 11. Implement public web - Masterplan View
  - [ ] 11.1 Create MasterplanView component
    - Render MapRenderer in read-only mode
    - Display all blocks, facilities, and decorations from canvas_elements
    - Show real-time status colors on blocks
    - Prevent drag and edit operations
    - _Requirements: 2.1, 2.2, 2.3, 2.9_

  - [ ] 11.2 Implement zoom to Detail Unit View
    - Handle cluster/block click events
    - Transition to Detail Unit View for selected cluster
    - _Requirements: 2.7_

  - [ ] 11.3 Ensure background images are not displayed in public view
    - Filter out background images when rendering public masterplan
    - _Requirements: 23A.12_

  - [ ]* 11.4 Write property test for background image visibility restriction
    - **Property 20: Background image visibility restriction**
    - **Validates: Requirements 23A.12**

- [ ] 12. Implement public web - Detail Unit View
  - [ ] 12.1 Create DetailUnitView component
    - Render units with appropriate layout (grid/linear/curved)
    - Display unit numbers clearly (20px bold)
    - Apply commodity/livestock color coding
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ] 12.2 Implement unit detail modal
    - Show unit number, luas lahan, luas unit, block name, commodity/livestock type
    - Display booking button for available units
    - Use large fonts and touch targets for senior users
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 28.14, 28.18_

  - [ ] 12.3 Implement WhatsApp booking redirect
    - Generate WhatsApp message based on project type
    - Implement fallback to web.whatsapp.com if app not installed
    - _Requirements: 5.1, 5.2, 5.6, 19.4_

  - [ ]* 12.4 Write property tests for WhatsApp message format
    - **Property 2: WhatsApp message format consistency for Borneo**
    - **Property 3: WhatsApp message format consistency for Jogja**
    - **Property 4: WhatsApp message format consistency for Patuk**
    - **Validates: Requirements 5.3, 5.4, 5.5**

- [ ] 13. Implement mobile responsiveness and touch gestures
  - [ ] 13.1 Implement pinch-to-zoom gesture
    - Use touch event handlers for pinch gesture
    - Zoom in/out on Interactive Map
    - _Requirements: 15.2_

  - [ ] 13.2 Implement swipe gesture for panning
    - Handle touch move events for map panning
    - _Requirements: 15.3_

  - [ ] 13.3 Implement double-tap zoom
    - Zoom in to tapped location as alternative to pinch
    - _Requirements: 28.13_

  - [ ] 13.4 Add large zoom controls for senior users
    - Create +/- buttons (64x64px) with high contrast
    - Position in bottom-right corner
    - _Requirements: 28.11, 28.12_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement marketing dashboard - Login and authentication
  - [ ] 15.1 Create marketing login page
    - Reuse login component with marketing-specific styling
    - Handle authentication errors
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 15.2 Implement session management
    - Maintain session until logout or timeout
    - Redirect to dashboard on successful login
    - _Requirements: 6.4_

- [ ] 16. Implement marketing dashboard - Dashboard overview
  - [ ] 16.1 Create MarketingDashboard component
    - Display summary cards: Total Bookings, Total Sold, Pending Bookings
    - Show booking table with columns: Nomor Unit, Project Name, Nama Calon Pembeli, Nomor HP, Status, Tanggal Booking, Actions
    - Use large row height (64px) for senior-friendly scanning
    - _Requirements: 6B.1, 6B.2, 6B.3, 6B.4, 28.23_

  - [ ] 16.2 Implement booking table filtering and search
    - Add status filter dropdown
    - Add search input for unit number or client name
    - Implement real-time filtering
    - _Requirements: 6B.6, 6B.7_

  - [ ]* 16.3 Write property test for booking status filter
    - **Property 9: Booking status filter correctness**
    - **Validates: Requirements 6B.6**

  - [ ]* 16.4 Write property test for booking search functionality
    - **Property 10: Booking search functionality**
    - **Validates: Requirements 6B.7**

  - [ ] 16.3 Implement table sorting
    - Add sort handlers for each column
    - _Requirements: 6B.8_

  - [ ] 16.4 Implement booking detail modal
    - Show all booking information
    - Provide downloadable links for KK and KTP files
    - _Requirements: 6B.5_

- [ ] 17. Implement marketing dashboard - Booking functionality
  - [ ] 17.1 Create BookingModal component
    - Display form with fields: Nomor Unit (auto-filled), Nama Calon Pembeli, Nomor HP, Upload KK, Upload KTP, Catatan
    - Use large input fields (56px height) with clear labels
    - Implement file upload with validation
    - _Requirements: 6A.2, 6A.3, 6A.4, 28.14_

  - [ ] 17.2 Implement booking submission
    - Upload files to Supabase Storage
    - Create booking record in database
    - Change unit status to Booking (yellow)
    - Display success notification with large font
    - _Requirements: 6A.5, 6A.6, 6A.7, 6A.8, 28.15, 28.20_

  - [ ]* 17.3 Write property test for booking cancellation state consistency
    - **Property 7: Booking cancellation state consistency**
    - **Validates: Requirements 6A.12**

  - [ ] 17.4 Implement booking cancellation
    - Display warning dialog with large, clear text
    - Change unit status back to Available
    - Remove booking data but keep files for audit
    - _Requirements: 6A.11, 6A.12, 28.18_

  - [ ] 17.5 Implement cross-agent booking protection
    - Check if booking was created by current marketing agent
    - Prevent cancellation if created by another agent
    - Display error message
    - _Requirements: 6A.13_

  - [ ]* 17.6 Write property test for cross-agent booking protection
    - **Property 8: Cross-agent booking protection**
    - **Validates: Requirements 6A.13**

- [ ] 18. Implement marketing dashboard - Mark as Sold functionality
  - [ ] 18.1 Create SoldModal component
    - Display CRM form with fields: Nama Pembeli Final, Nomor HP Final, Email, Alamat, Tanggal Transaksi, Nominal Transaksi, Nomor SPJK, Metode Pembayaran, Upload Bukti Pembayaran
    - Use large input fields (56px height)
    - _Requirements: 6C.2, 28.14_

  - [ ] 18.2 Implement sold transaction submission
    - Validate required fields
    - Calculate commission based on nominal transaksi
    - Change unit status to Sold (red)
    - Store all CRM data in transactions table
    - Update dashboard statistics
    - _Requirements: 6C.3, 6C.5, 6C.8_

  - [ ]* 18.3 Write property test for sold transaction data completeness
    - **Property 11: Sold transaction data completeness**
    - **Validates: Requirements 6C.3**

  - [ ]* 18.4 Write property test for commission calculation accuracy
    - **Property 12: Commission calculation accuracy**
    - **Validates: Requirements 6C.8**

  - [ ] 18.5 Implement transaction details view
    - Display complete CRM data including booking history
    - Prevent status change back to Booking or Available
    - _Requirements: 6C.6, 6C.7_

- [ ] 19. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Implement admin dashboard - Login and navigation
  - [ ] 20.1 Create admin login page
    - Reuse login component with admin-specific styling
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 20.2 Create admin navigation menu
    - Display menu with Inventori Management and Marketing Account Management options
    - _Requirements: 7.5_

- [ ] 21. Implement admin dashboard - Inventori management
  - [ ] 21.1 Create DashboardInventori component
    - Display project selection for all projects
    - Implement search function for unit numbers
    - Implement status filter (Available, Booking, Sold)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 21.2 Implement unit selection in Canvas Editor
    - Toggle selection on unit click
    - Implement drag selection rectangle
    - Implement "Select All in Row" button
    - Display visual cues for selected units (distinct border)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 16.1, 16.2, 16.3, 16.4_

  - [ ] 21.3 Create Floating Action Menu for status changes
    - Display menu when units are selected
    - Implement "Set Available" action
    - Implement "Set Booking/Keep" action with marketing agent name input
    - Implement "Set Sold" action with CRM Lite form
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 22. Implement admin dashboard - Marketing account management
  - [ ] 22.1 Create MarketingAccountManagement component
    - Display list of existing marketing accounts
    - Show account status, last login, and action buttons
    - _Requirements: 18.1, 18.5_

  - [ ] 22.2 Implement create marketing account
    - Display form with fields: name, email, phone number, initial password
    - Create account in Supabase Auth
    - Send email notification with credentials
    - _Requirements: 18.2, 18.3, 18.4_

  - [ ] 22.3 Implement account deactivation and password reset
    - Deactivate account and prevent future logins
    - Generate new temporary password and send via email
    - _Requirements: 18.6, 18.7_

- [ ] 23. Implement admin dashboard - Project management
  - [ ] 23.1 Create ProjectManagement component
    - Display list of existing projects with thumbnails
    - Show project status, display order, and featured flag
    - _Requirements: 20.1, 27.4_

  - [ ] 23.2 Implement drag-and-drop project reordering
    - Use React DnD or @dnd-kit for drag-and-drop
    - Update display_order field in database on reorder
    - Reflect changes on public homepage immediately
    - _Requirements: 27.4, 27.5_

  - [ ] 23.3 Implement create project form
    - Display form with fields: project name, location, total area, layout type, description
    - Create empty project and redirect to Canvas Editor
    - Set project status to "Draft" by default
    - _Requirements: 20.2, 20.3, 27.1_

  - [ ] 23.4 Implement project visibility controls
    - Add status dropdown (Draft/Published/Hidden)
    - Update project status in database
    - Filter public homepage based on status
    - _Requirements: 27.2, 27.3_

  - [ ] 23.5 Implement featured project toggle
    - Add featured checkbox for each project
    - Update is_featured flag in database
    - Display featured projects with highlighted border on homepage
    - _Requirements: 27.6_

  - [ ] 23.6 Implement project deletion with validation
    - Check if project contains sold units using SQL query
    - Prevent deletion if sold units exist with error message "Project tidak dapat dihapus karena memiliki unit yang sudah terjual"
    - Allow deletion if only Available or Booking units
    - Display confirmation dialog before deletion
    - Remove project from public homepage immediately
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5, 22.6_

  - [ ]* 23.7 Write property test for project deletion validation
    - **Property 17: Project deletion validation with sold units**
    - **Property 18: Project deletion allowance without sold units**
    - **Validates: Requirements 22.3, 22.4**

- [ ] 24. Implement Canvas Editor - Core functionality
  - [ ] 24.1 Create CanvasEditor component
    - Display blank canvas with toolbar
    - Implement element categories: Blocks, Facilities, Units, Decorations
    - _Requirements: 20.4, 23.1, 23.2, 23.3, 23.4, 23.5_

  - [ ] 24.2 Implement drag-and-drop element placement
    - Handle drag events for Block, Facility, Unit, Decoration elements
    - Create elements with configurable properties
    - _Requirements: 20.5, 20.6, 20.7_

  - [ ] 24.3 Implement properties panel
    - Display properties for selected element
    - Update element in real-time on property change
    - _Requirements: 21.2, 21.3_

  - [ ] 24.4 Implement undo/redo functionality
    - Maintain history stack of canvas states
    - Implement undo and redo actions
    - _Requirements: (implicit for canvas editor)_

  - [ ] 24.5 Implement auto-save
    - Save canvas state every 30 seconds
    - Store all elements configuration to Supabase
    - _Requirements: 20.10, 21.6_

- [ ] 25. Implement Canvas Editor - Background image upload
  - [ ] 25.1 Implement background image upload
    - Display "Upload Background" button in toolbar
    - Open file picker for JPG, PNG, SVG (max 10MB)
    - Validate file type and size
    - Upload to Supabase Storage 'project-backgrounds' bucket
    - Display image as bottom layer (z-index 0)
    - _Requirements: 23A.1, 23A.2, 23A.3_

  - [ ]* 25.2 Write property test for background image z-index layering
    - **Property 36: Background image z-index layering**
    - **Validates: Requirements 23A.3, 23A.6**

  - [ ]* 25.3 Write property test for background image public visibility restriction
    - **Property 37: Background image public visibility restriction**
    - **Validates: Requirements 23A.12**

  - [ ] 25.4 Implement opacity control
    - Add opacity slider (0-100%)
    - Update transparency in real-time
    - Store opacity value in project configuration
    - _Requirements: 23A.4, 23A.5_

  - [ ]* 25.5 Write property test for background opacity range validation
    - **Property 38: Background opacity range validation**
    - **Validates: Requirements 23A.4, 23A.5**

  - [ ] 25.6 Implement toggle background visibility
    - Add "Toggle Background" button to show/hide
    - Update background_visible flag without deleting image
    - _Requirements: 23A.7_

  - [ ] 25.7 Implement delete background
    - Add "Delete Background" button with confirmation dialog "Hapus background image? Aksi ini tidak dapat dibatalkan"
    - Delete image from Supabase Storage
    - Clear background_image_url, background_opacity, background_visible in database
    - _Requirements: 23A.8, 23A.9_

  - [ ] 25.8 Persist background image settings
    - Store background URL, opacity, and visibility in project configuration
    - Load background with saved settings on project reopen
    - _Requirements: 23A.10, 23A.11_

  - [ ] 25.9 Ensure background never displays in public view
    - Filter out background image when rendering public masterplan
    - Only show background in canvas editor mode
    - _Requirements: 23A.12_

- [ ] 26. Implement Canvas Editor - Bulk Unit Generator
  - [ ] 26.1 Create Bulk Unit Generator form
    - Display form with parameters: quantity, starting number, arrangement (grid/row/arc), spacing
    - _Requirements: 23.6_

  - [ ] 26.2 Implement grid arrangement generation
    - Generate units in grid pattern with configurable rows, columns, rotation
    - _Requirements: 20.8_

  - [ ] 26.3 Implement row arrangement generation
    - Generate units in horizontal or vertical row with spacing
    - _Requirements: 23.6_

  - [ ] 26.4 Implement arc arrangement generation for curved layouts
    - Display controls for arc radius, start angle, end angle, units per row
    - Generate units along arc path using SVG calculations
    - Support multiple curved rows with different parameters for terracing effect
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.7_

  - [ ]* 26.5 Write property test for bulk unit generator sequential numbering
    - **Property 39: Bulk unit generator sequential numbering**
    - **Validates: Requirements 23.6, 21.4**

  - [ ]* 26.6 Write property test for arc arrangement unit distribution
    - **Property 40: Arc arrangement unit distribution**
    - **Validates: Requirements 24.2, 24.3**

  - [ ]* 26.7 Write property test for multiple curved rows independence
    - **Property 41: Multiple curved rows independence**
    - **Validates: Requirements 24.4, 24.7**

  - [ ]* 26.8 Write property test for reactive curved layout updates
    - **Property 22: Reactive curved layout updates**
    - **Validates: Requirements 24.6**

  - [ ] 26.9 Implement auto-assign sequential unit numbers
    - Automatically assign sequential unit numbers starting from specified number
    - _Requirements: 21.4_

- [ ] 27. Implement Canvas Editor - Decorations
  - [ ] 27.1 Implement Green Area decoration
    - Allow freeform drawing or polygon shape creation
    - _Requirements: 23.7_

  - [ ] 27.2 Implement Label/Text decoration
    - Provide text input, font size, color, and rotation options
    - _Requirements: 23.8_

- [ ] 28. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 29. Implement error handling and edge cases
  - [ ] 29.1 Implement connection monitoring
    - Create useConnectionMonitor hook to track online/offline status
    - Display toast notification when connection lost/restored
    - _Requirements: 19.1, 19.3_

  - [ ] 29.2 Implement network error handling with retry queue
    - Display error message "Tidak dapat terhubung ke server, silakan coba lagi"
    - Implement retry logic with exponential backoff
    - Queue failed operations for retry when connection restored
    - Process queued operations when connection restored
    - _Requirements: 19.1, 19.2, 19.3_

  - [ ]* 29.3 Write property test for network error retry queue consistency
    - **Property 44: Network error retry queue consistency**
    - **Validates: Requirements 19.3**

  - [ ] 29.4 Implement project data loading error handling
    - Display error message "Gagal memuat data project, silakan coba lagi"
    - Provide retry button
    - _Requirements: 19.2_

  - [ ] 29.5 Implement WhatsApp fallback
    - Try to open WhatsApp app first with whatsapp:// URL
    - Fallback to web.whatsapp.com after 2 seconds if app not installed
    - _Requirements: 19.4_

  - [ ]* 29.6 Write property test for WhatsApp message format by project type
    - **Property 45: WhatsApp message format by project type**
    - **Validates: Requirements 5.3, 5.4, 5.5**

  - [ ] 29.7 Implement graceful error handling for invalid unit data
    - Validate unit data before rendering (check required fields)
    - Log errors for invalid unit data
    - Skip rendering invalid units without crashing entire map
    - _Requirements: 19.5_

  - [ ]* 29.8 Write property test for graceful error handling
    - **Property 30: Graceful error handling for invalid unit data**
    - **Validates: Requirements 19.5**

  - [ ] 29.9 Implement senior-friendly error messages
    - Use large font (18px minimum) with icon indicators
    - Display for minimum 5 seconds (longer than standard 3 seconds)
    - Use high contrast colors (red #DC2626 on white)
    - Provide actionable next steps in error messages
    - _Requirements: 28.15_

- [ ] 30. Implement brand identity and styling
  - [ ] 30.1 Apply Pring Land brand colors throughout application
    - Use green color palette: #22C55E (light), #16A34A (main), #15803D (dark)
    - Use status colors: white (available), #EAB308 (booking), #DC2626 (sold)
    - Use neutral colors: #F9FAFB (background), #111827 (text), #374151 (border)
    - Display Pring Land logo consistently on all pages
    - _Requirements: 25.1, 25.2, 25.8_

  - [ ]* 30.2 Write property test for brand color consistency
    - **Property 42: Brand color consistency**
    - **Validates: Requirements 25.2**

  - [ ]* 30.3 Write property test for status color high contrast validation
    - **Property 43: Status color high contrast validation**
    - **Validates: Requirements 25.8, 28.7, 28.8**

  - [ ] 30.4 Apply modern design principles
    - Use rounded corners (8px for cards, 6px for buttons)
    - Use soft shadows (shadow-md for cards, shadow-sm for buttons)
    - Use clean sans-serif fonts (Inter font family)
    - _Requirements: 25.3, 25.4_

  - [ ] 30.5 Apply agricultural aesthetic to siteplan
    - Use organic textures or subtle green gradients for siteplan background
    - Use house/building icons with agricultural aesthetic for units
    - Use simple line icons with green accents for facilities
    - _Requirements: 25.5, 25.6, 25.7_

  - [ ] 30.6 Implement canvas editor workspace styling
    - Use light background (#F9FAFB) with subtle grid pattern
    - Create professional workspace feel
    - _Requirements: 25.10_

  - [ ] 30.7 Implement bottom navigation for mobile
    - Use bottom navigation bar (72px height) for easy thumb access
    - Include text labels with icons (not icon-only)
    - Use icon size 32px with label text 14px
    - Position in easily reachable area
    - _Requirements: 25.9, 28.16, 28.17_

- [ ] 31. Implement visual icons and legend
  - [ ] 31.1 Add commodity/livestock icons to units
    - Display chicken or duck icons for Jogja/Patuk units
    - Display commodity name or icon for Borneo units
    - _Requirements: 17.1, 17.2_

  - [ ] 31.2 Create legend component
    - Show color coding with corresponding labels
    - _Requirements: 17.3_

- [ ] 32. Final testing and optimization
  - [ ]* 32.1 Run all property-based tests
    - Execute all 45 property tests with minimum 100 iterations each
    - Verify all correctness properties hold
    - Properties include: real-time sync, WhatsApp messages, file validation, booking state, status filters, search, transactions, layout calculations, touch targets, project deletion, background images, bulk generation, curved layouts, senior-friendly design, error handling, brand consistency

  - [ ]* 32.2 Run accessibility tests
    - Verify WCAG AA compliance using axe-core
    - Test with screen readers
    - Verify color contrast ratios (4.5:1 for normal text, 3:1 for large text)
    - Test keyboard navigation
    - Verify focus indicators

  - [ ]* 32.3 Run performance tests
    - Verify FCP < 1.5s, LCP < 2.5s, TTI < 3.5s using Lighthouse
    - Verify 60fps scrolling on mobile using Chrome DevTools
    - Verify real-time update latency < 500ms
    - Test virtualization performance for linear layouts with 100+ units

  - [ ]* 32.4 Test on actual mobile devices
    - Test touch targets (56px minimum for senior mode, 44px minimum standard)
    - Test font sizes (18px body, 16px labels, 20px unit numbers, 24px headings)
    - Test animations (300ms minimum duration with smooth easing)
    - Test with browser zoom at 150% and 200%
    - Test pinch-to-zoom, swipe, and double-tap gestures
    - Test on devices with screen readers enabled

- [ ] 33. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
